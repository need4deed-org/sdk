export enum Endpoint {
  OPPORTUNITY = "/opportunity",
  OPPORTUNITY_OTHER = "/opportunity/other",
  EVENT = "/event",
  TESTIMONIAL = "/testimonial",
  VOLUNTEER = "/volunteer",
  OPTION = "/option",
  AGENT = "/agent",
  AGENT_TAG_CANDIDATES = "/agent/tag-candidates",
  REGISTER = "/register",
  STATISTICS = "/statistics",
  SEARCH_SUGGEST = "/search/suggest",
  ADMIN_EMAIL_TEMPLATE = "/admin/email-template",
  GROUP = "/group",
}

export const agentVolunteerExportPath = (agentId: number) =>
  `${Endpoint.AGENT}/${agentId}/volunteer/export`;

export const agentOpportunityExportPath = (agentId: number) =>
  `${Endpoint.AGENT}/${agentId}/opportunity/export`;

export const volunteerLinkedAgentPath = (
  volunteerId: number,
  agentId: number,
) => `${Endpoint.VOLUNTEER}/${volunteerId}/linked-agent/${agentId}`;
