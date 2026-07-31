-- ═══════════════════════════════════════════════════════════════════
-- Nexus Method Consulting CRM — Migration 002
-- Seed data: 8 ICP-sweep prospecting leads from Austin ICP sweep
--
-- HOW TO APPLY:
--   After migration 001: Supabase Dashboard → SQL Editor → paste + Run.
--   OR run automations/lead-webhook/seed-via-postgrest.sh once
--   ~/.config/lead-webhook.env has real credentials.
--
-- Source: ClickUp Lead Pipeline list 901416970838 (migrated 2026-07-30).
-- These 8 companies were sourced by the ICP sweep (not inbound form leads).
-- source = 'prospecting' for all rows.
--
-- Scores are from the enrich-and-score-lead skill runs in July 2026.
-- Created: 2026-07-30 (Stack, ITM-01KYTSZCS4H0JQ4XEKYK90PVNP)
-- ═══════════════════════════════════════════════════════════════════

-- ─── Handyman Connection (Austin) ─────────────────────────────────
WITH co AS (
  INSERT INTO companies (name, vertical, industry, hq_city, hq_state, revenue_est, source)
  VALUES ('Handyman Connection', 'home services', 'Home Services Franchise', 'Austin', 'TX', '$1M–$3M', 'manual')
  ON CONFLICT DO NOTHING
  RETURNING id
),
ct AS (
  INSERT INTO contacts (company_id, name, title, is_decision_maker, source)
  SELECT id, 'Trung Huynh', 'Owner', true, 'manual' FROM co
  ON CONFLICT DO NOTHING
  RETURNING id, company_id
)
INSERT INTO leads (company_id, contact_id, name, company, source, status, score, tier, notes)
SELECT ct.company_id, ct.id, 'Trung Huynh', 'Handyman Connection', 'prospecting', 'enriched', 100, 'A',
  'Tier A · 100/100 · Calibration fixture: known-fit. Austin home-services franchise, owner Trung Huynh (direct line, verified). Manual quoting pain: 50–70 min/day — verified first-hand in Phase-1 estimator build. Estimator v2 live on real Jobber 7/12. Next: convert pro-bono pilot to paid Phase 2.'
FROM ct
ON CONFLICT DO NOTHING;

-- ─── Carabuena Tequila ────────────────────────────────────────────
WITH co AS (
  INSERT INTO companies (name, vertical, industry, hq_city, hq_state, source)
  VALUES ('Carabuena Tequila', 'cpg', 'Spirits / CPG', 'Austin', 'TX', 'manual')
  ON CONFLICT DO NOTHING
  RETURNING id
),
ct AS (
  INSERT INTO contacts (company_id, name, title, is_decision_maker, source)
  SELECT id, 'Brian Grigsby', 'CEO', true, 'manual' FROM co
  ON CONFLICT DO NOTHING
  RETURNING id, company_id
)
INSERT INTO leads (company_id, contact_id, name, company, source, status, score, tier, notes)
SELECT ct.company_id, ct.id, 'Brian Grigsby', 'Carabuena Tequila', 'prospecting', 'cold', 35, 'C',
  'Tier C · 35/100 · Known misfit — CPG (spirits), not a service business. Geography and founder reachable (Brian Grigsby, CEO, existing relationship). Core ICP dimensions (vertical, revenue, team) score zero. Existing relationship continues through delivery engagement track (Corsa). Next: none via this pipeline.'
FROM ct
ON CONFLICT DO NOTHING;

-- ─── Dunman Electric (Austin) ─────────────────────────────────────
WITH co AS (
  INSERT INTO companies (name, vertical, industry, hq_city, hq_state, source)
  VALUES ('Dunman Electric', 'electrical', 'Electrical Contractor (Trades)', 'Austin', 'TX', 'manual')
  ON CONFLICT DO NOTHING
  RETURNING id
)
INSERT INTO leads (company_id, company, source, status, score, tier, notes)
SELECT id, 'Dunman Electric', 'prospecting', 'enriched', 35, 'C-provisional',
  'C-provisional · 35/100 · 29-yr Austin electrical contractor (3327 W Slaughter Ln, 73 reviews). All zeros are unknowns, not disqualifiers. Owner not yet named. 4.0 star vs 4.8-5.0 peer average suggests ops friction. Revenue and team plausibly in-band. Next: Apollo enrichment pass to resolve revenue/headcount/owner, then re-score.'
FROM co
ON CONFLICT DO NOTHING;

-- ─── Cold is on the Right Plumbing (Austin) ───────────────────────
WITH co AS (
  INSERT INTO companies (name, vertical, industry, hq_city, hq_state, source)
  VALUES ('Cold is on the Right Plumbing', 'plumbing', 'Plumbing (Trades)', 'Austin', 'TX', 'manual')
  ON CONFLICT DO NOTHING
  RETURNING id
),
ct AS (
  INSERT INTO contacts (company_id, name, title, is_decision_maker, source)
  SELECT id, 'Brendin Dittman', 'Owner', true, 'manual' FROM co
  ON CONFLICT DO NOTHING
  RETURNING id, company_id
)
INSERT INTO leads (company_id, contact_id, name, company, source, status, score, tier, notes)
SELECT ct.company_id, ct.id, 'Brendin Dittman', 'Cold is on the Right Plumbing', 'prospecting', 'enriched', 40, 'C-provisional',
  'C-provisional · 40/100 · Brendin Dittman (owner). Jobber Grants Austin recipient (2023, re-verify). Plumbing shop already on Jobber = pre-qualified for estimator-to-Jobber automation. Community-minded owner (mentors apprentices, tiny homes for affordable housing). Top-3 target once enriched. Next: Apollo enrich (revenue/team/contact) then re-score.'
FROM ct
ON CONFLICT DO NOTHING;

-- ─── Straight Edge Landscaping (Austin) ───────────────────────────
WITH co AS (
  INSERT INTO companies (name, vertical, industry, hq_city, hq_state, source)
  VALUES ('Straight Edge Landscaping', 'landscaping', 'Landscaping (Trades)', 'Austin', 'TX', 'manual')
  ON CONFLICT DO NOTHING
  RETURNING id
),
ct AS (
  INSERT INTO contacts (company_id, name, title, is_decision_maker, source)
  SELECT id, 'Jaylin Lane', 'Owner', true, 'manual' FROM co
  ON CONFLICT DO NOTHING
  RETURNING id, company_id
)
INSERT INTO leads (company_id, contact_id, name, company, source, status, score, tier, notes)
SELECT ct.company_id, ct.id, 'Jaylin Lane', 'Straight Edge Landscaping', 'prospecting', 'enriched', 40, 'C-provisional',
  'C-provisional · 40/100 · Jaylin Lane (owner). Jobber Grants Austin recipient (2023, re-verify). Landscaping is quoting-heavy and scheduling-heavy — strong fit for productized Jobber automation. Next: Apollo enrich then re-score.'
FROM ct
ON CONFLICT DO NOTHING;

-- ─── Tex-Mex Cleaning Services (Austin) ───────────────────────────
WITH co AS (
  INSERT INTO companies (name, vertical, industry, hq_city, hq_state, source)
  VALUES ('Tex-Mex Cleaning Services', 'cleaning', 'Cleaning Services', 'Austin', 'TX', 'manual')
  ON CONFLICT DO NOTHING
  RETURNING id
),
ct AS (
  INSERT INTO contacts (company_id, name, title, is_decision_maker, source)
  SELECT id, 'Karla Stanca', 'Owner', true, 'manual' FROM co
  ON CONFLICT DO NOTHING
  RETURNING id, company_id
)
INSERT INTO leads (company_id, contact_id, name, company, source, status, score, tier, notes)
SELECT ct.company_id, ct.id, 'Karla Stanca', 'Tex-Mex Cleaning Services', 'prospecting', 'enriched', 40, 'C-provisional',
  'C-provisional · 40/100 · Karla Stanca (owner). Jobber Grants Austin recipient (2023, re-verify). Cleaning services often run below the $500K floor — size check required before any effort. Next: Apollo enrich; deprioritize if revenue < $500K.'
FROM ct
ON CONFLICT DO NOTHING;

-- ─── Wells Solar & Electrical Services (Austin) ───────────────────
WITH co AS (
  INSERT INTO companies (name, vertical, industry, hq_city, hq_state, source)
  VALUES ('Wells Solar & Electrical Services', 'solar/electrical', 'Solar + Electrical (Trades)', 'Austin', 'TX', 'manual')
  ON CONFLICT DO NOTHING
  RETURNING id
),
ct AS (
  INSERT INTO contacts (company_id, name, title, is_decision_maker, source)
  SELECT id, 'Carl Wells', 'Owner', true, 'manual' FROM co
  ON CONFLICT DO NOTHING
  RETURNING id, company_id
)
INSERT INTO leads (company_id, contact_id, name, company, source, status, score, tier, notes)
SELECT ct.company_id, ct.id, 'Carl Wells', 'Wells Solar & Electrical Services', 'prospecting', 'enriched', 40, 'C-provisional',
  'C-provisional · 40/100 · Carl Wells (owner). Jobber Grants Austin recipient (2023, re-verify). Caution: solar+electrical with significant charitable giving ($70K+ donated) suggests a larger operation — may exceed $5M cap. Next: Apollo enrich + size check first; if >$5M or >30 staff, mark out-of-segment (still a referral/community node).'
FROM ct
ON CONFLICT DO NOTHING;

-- ─── Eco Valet Trash (Austin) ─────────────────────────────────────
WITH co AS (
  INSERT INTO companies (name, vertical, industry, hq_city, hq_state, source)
  VALUES ('Eco Valet Trash', 'waste', 'Waste Services / Valet Trash', 'Austin', 'TX', 'manual')
  ON CONFLICT DO NOTHING
  RETURNING id
),
ct AS (
  INSERT INTO contacts (company_id, name, title, is_decision_maker, source)
  SELECT id, 'Beto Jimenez', 'Owner', true, 'manual' FROM co
  ON CONFLICT DO NOTHING
  RETURNING id, company_id
)
INSERT INTO leads (company_id, contact_id, name, company, source, status, score, tier, notes)
SELECT ct.company_id, ct.id, 'Beto Jimenez', 'Eco Valet Trash', 'prospecting', 'enriched', 40, 'C-provisional',
  'C-provisional · 40/100 · Beto Jimenez (owner). Jobber Grants Austin recipient (2023 via Jobber press release). Door-side valet trash + bulk removal — route-based recurring service. Revenue and team unknown. Next: Apollo enrich + size check.'
FROM ct
ON CONFLICT DO NOTHING;

-- ─── Verify ───────────────────────────────────────────────────────
-- After running, confirm all 8 leads exist:
--   SELECT c.name as company, l.tier, l.score, l.status, l.source
--   FROM leads l LEFT JOIN companies c ON c.id = l.company_id
--   WHERE l.source = 'prospecting'
--   ORDER BY l.score DESC;
--
-- Expected: 8 rows. Handyman Connection (A/100), then 6 C-provisional/40, then Carabuena (C/35).
