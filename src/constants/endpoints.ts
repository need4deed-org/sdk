export enum Endpoint {
  OPPORTUNITY = "/opportunity",
  EVENT = "/event",
  TESTIMONIAL = "/testimonial",
  VOLUNTEER = "/volunteer",
  OPTION = "/option",
  AGENT = "/agent",
  // Sub-path prefix, mounted under AGENT (mirrors the backend's
  // `register(agentRegisterRoutes, { prefix: REGISTER })`). Compose as
  // `Endpoint.AGENT + Endpoint.REGISTER` -> "/agent/register".
  REGISTER = "/register",
}
