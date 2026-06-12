// Email-domain allowlist for agent self-registration. A registrant whose email
// domain is on this list is treated as belonging to a known RAC organisation —
// so a brand-new representative (whose org has no existing member yet) can still
// register, and a join auto-approves to ACTIVE. Managed by COORDINATOR/ADMIN.

export interface ApiTrustedDomain {
  id: number;
  domain: string;
}

export interface ApiTrustedDomainPost {
  domain: string;
}

export interface ApiTrustedDomainPatch {
  domain: string;
}
