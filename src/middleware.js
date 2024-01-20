export { default } from "next-auth/middleware";

//In order to protect specific pages use this approach:

export const config = { matcher: ["/home"] };
