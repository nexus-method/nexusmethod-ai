import type { NextConfig } from "next";

/**
 * nexusmethod.ai serves no pages. It is a forwarding address.
 *
 * dec-2026-08-01-mollyjaggers-com-becomes-the-one-consulting-site: mollyjaggers.com
 * is the one site; this domain 301s and keeps only the Workspace email identity.
 * That call sat unexecuted for 27 days while both domains served competing sites,
 * each with its own Book a Call, splitting name-driven traffic between a domain
 * with five months of indexed history and one with eight days.
 *
 * Everything redirects to the root rather than mapping paths through, because the
 * two sites have different information architecture and a path-preserving redirect
 * would land visitors on 404s.
 *
 * The domain registration is NEVER released. It holds the Workspace email identity
 * and the Consulting calendar, and "The Nexus Method" is the named framework on
 * mollyjaggers.com, so a lapsed registration invites a squatter on the exact phrase
 * the practice is building equity in.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://mollyjaggers.com",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
