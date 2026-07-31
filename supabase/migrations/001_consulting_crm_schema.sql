-- ═══════════════════════════════════════════════════════════════════
-- Nexus Method Consulting CRM — Migration 001
-- Full schema: companies, contacts, leads, engagements, touchpoints
--
-- HOW TO APPLY:
--   Supabase Dashboard → nexus-method-consulting → SQL Editor
--   Paste this entire file and click Run.
--
-- IDEMPOTENT: uses CREATE TABLE IF NOT EXISTS + ADD COLUMN IF NOT EXISTS.
--   Safe to re-run on an existing project; won't drop or corrupt data.
--
-- CRITICAL (newer Supabase projects with sb_secret_ keys):
--   PostgREST returns 403 without explicit GRANT statements even with a
--   valid service_role key. The GRANTs at the bottom of this file are
--   REQUIRED — do not skip them.
--
-- Created: 2026-07-30 (Stack, ITM-01KYTSZCS4H0JQ4XEKYK90PVNP)
-- ═══════════════════════════════════════════════════════════════════

-- ─── updated_at trigger function ──────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─── companies ────────────────────────────────────────────────────
-- ICP target companies with enriched firmographic data.
-- Populated by Apollo/Apify enrichment; also manually for known accounts.
CREATE TABLE IF NOT EXISTS companies (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name           text        NOT NULL,
  domain         text,
  industry       text,
  vertical       text,         -- trades | cleaning | landscaping | electrical | plumbing | solar | waste | cpg
  hq_city        text         DEFAULT 'Austin',
  hq_state       text         DEFAULT 'TX',
  revenue_est    text,         -- "$1M–$3M" string range — never an invented number
  employees_est  int,
  website        text,
  linkedin_url   text,
  source         text        NOT NULL DEFAULT 'manual',  -- manual | apollo | apify
  enriched_at    timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

-- ─── contacts ─────────────────────────────────────────────────────
-- Decision-makers and key contacts at companies.
CREATE TABLE IF NOT EXISTS contacts (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id        uuid        REFERENCES companies(id) ON DELETE SET NULL,
  name              text        NOT NULL,
  title             text,
  email             text,
  phone             text,
  linkedin_url      text,
  is_decision_maker boolean     NOT NULL DEFAULT false,
  source            text        DEFAULT 'manual',  -- manual | apollo | apify | networking
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

-- ─── leads ────────────────────────────────────────────────────────
-- Core pipeline table: inbound form submissions + prospected companies.
--
-- Fields:
--   company_id / contact_id  — null until enrichment resolves the raw strings
--   name / email             — inbound: required by form; prospecting: may be null
--   company                  — raw string from form / prospecting outreach
--   source                   — website_form | prospecting | networking | referral | enrichment
--   status                   — new | enriched | contacted | discovery | proposal | closed | cold
--   tier                     — A | B | C | A-provisional | B-provisional | C-provisional
--   enrichment               — full Apollo/Apify enrichment payload (jsonb)
--
-- The leads table is the primary target for:
--   - nexusmethod.ai /api/contact route (INSERT with service_role key)
--   - n8n lead-webhook pipeline writeback (PATCH score/tier/status/notes)
--   - enrich-and-score-lead skill (PATCH enrichment + full scored payload)
CREATE TABLE IF NOT EXISTS leads (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id   uuid        REFERENCES companies(id) ON DELETE SET NULL,
  contact_id   uuid        REFERENCES contacts(id)  ON DELETE SET NULL,
  name         text,       -- inbound: stated name; prospecting: owner name if known
  email        text,       -- inbound: always present; prospecting: null until enriched
  company      text,       -- raw company name (before resolution to companies table)
  message      text,
  source       text        NOT NULL DEFAULT 'website_form',
  status       text        NOT NULL DEFAULT 'new',
  score        int,
  tier         text,
  enrichment   jsonb,
  notes        text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- Add FK columns to pre-existing leads table (idempotent if table was created above)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS company_id uuid REFERENCES companies(id) ON DELETE SET NULL;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS contact_id uuid REFERENCES contacts(id)  ON DELETE SET NULL;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS tier       text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS enrichment jsonb;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- ─── engagements ──────────────────────────────────────────────────
-- Formal consulting engagements (proposal through delivery).
-- contract_value is BIGINT cents — INT4 overflows at ~$21.4M (Stack memory.md).
CREATE TABLE IF NOT EXISTS engagements (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id      uuid        REFERENCES companies(id) ON DELETE SET NULL,
  lead_id         uuid        REFERENCES leads(id)    ON DELETE SET NULL,
  title           text        NOT NULL,
  phase           text        NOT NULL DEFAULT 'discovery',
                              -- discovery | proposal | active | complete | closed
  start_date      date,
  end_date        date,
  contract_value  bigint,     -- cents; use bigint not int4
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- ─── touchpoints ──────────────────────────────────────────────────
-- All interactions and communications (immutable events — no updated_at).
-- At least one of company_id / lead_id / engagement_id should be set.
CREATE TABLE IF NOT EXISTS touchpoints (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id      uuid        REFERENCES companies(id)   ON DELETE SET NULL,
  lead_id         uuid        REFERENCES leads(id)       ON DELETE SET NULL,
  engagement_id   uuid        REFERENCES engagements(id) ON DELETE SET NULL,
  type            text        NOT NULL,   -- call | email | demo | proposal | follow_up | meeting | note
  direction       text,                   -- inbound | outbound
  subject         text,
  notes           text,
  occurred_at     timestamptz NOT NULL DEFAULT now(),
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ─── Indexes ──────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_leads_status              ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source              ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_company_id          ON leads(company_id);
CREATE INDEX IF NOT EXISTS idx_contacts_company_id       ON contacts(company_id);
CREATE INDEX IF NOT EXISTS idx_engagements_company_id    ON engagements(company_id);
CREATE INDEX IF NOT EXISTS idx_engagements_lead_id       ON engagements(lead_id);
CREATE INDEX IF NOT EXISTS idx_touchpoints_lead_id       ON touchpoints(lead_id);
CREATE INDEX IF NOT EXISTS idx_touchpoints_company_id    ON touchpoints(company_id);
CREATE INDEX IF NOT EXISTS idx_touchpoints_engagement_id ON touchpoints(engagement_id);

-- ─── Row Level Security ───────────────────────────────────────────
-- All tables are locked behind RLS.
-- service_role bypasses RLS at the Supabase level (no explicit policy needed).
-- authenticated role gets read access (future server-side MC /consulting page).
-- anon role: no access on any table.
ALTER TABLE companies    ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts     ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads        ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagements  ENABLE ROW LEVEL SECURITY;
ALTER TABLE touchpoints  ENABLE ROW LEVEL SECURITY;

-- authenticated read policies (server-side MC page reads via authenticated JWT)
DROP POLICY IF EXISTS auth_read_companies    ON companies;
DROP POLICY IF EXISTS auth_read_contacts     ON contacts;
DROP POLICY IF EXISTS auth_read_leads        ON leads;
DROP POLICY IF EXISTS auth_read_engagements  ON engagements;
DROP POLICY IF EXISTS auth_read_touchpoints  ON touchpoints;

CREATE POLICY auth_read_companies    ON companies    FOR SELECT TO authenticated USING (true);
CREATE POLICY auth_read_contacts     ON contacts     FOR SELECT TO authenticated USING (true);
CREATE POLICY auth_read_leads        ON leads        FOR SELECT TO authenticated USING (true);
CREATE POLICY auth_read_engagements  ON engagements  FOR SELECT TO authenticated USING (true);
CREATE POLICY auth_read_touchpoints  ON touchpoints  FOR SELECT TO authenticated USING (true);

-- ─── GRANTs ───────────────────────────────────────────────────────
-- CRITICAL: newer Supabase projects (sb_secret_ key format) require these.
-- PostgREST is a separate permission surface from the auth admin.
-- A valid service_role key + auth test passing ≠ PostgREST access without GRANTs.
-- Omitting these causes 403 on every table access (experienced on Quarry 2026-07-24).
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL   ON companies, contacts, leads, engagements, touchpoints TO service_role;
GRANT SELECT ON companies, contacts, leads, engagements, touchpoints TO authenticated;
GRANT ALL   ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ─── updated_at Triggers ──────────────────────────────────────────
DROP TRIGGER IF EXISTS companies_updated_at    ON companies;
DROP TRIGGER IF EXISTS contacts_updated_at     ON contacts;
DROP TRIGGER IF EXISTS leads_updated_at        ON leads;
DROP TRIGGER IF EXISTS engagements_updated_at  ON engagements;

CREATE TRIGGER companies_updated_at    BEFORE UPDATE ON companies    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER contacts_updated_at     BEFORE UPDATE ON contacts     FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER leads_updated_at        BEFORE UPDATE ON leads        FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER engagements_updated_at  BEFORE UPDATE ON engagements  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Verify ───────────────────────────────────────────────────────
-- After running, confirm all 5 tables exist:
--   SELECT table_name FROM information_schema.tables
--   WHERE table_schema = 'public' ORDER BY table_name;
-- Expected: companies, contacts, engagements, leads, touchpoints
--
-- Then run migration 002 to seed the 8 ICP-sweep prospecting leads.
