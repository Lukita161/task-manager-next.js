export { default } from "next-auth/middleware"

export const config = { matcher: ["/", "/week", "/profile", "/profile/change-password"] }