export const NEXT_API =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_NEXT_URL
    : `http://localhost:${process.env.PORT || 3000}/api/`
export const REVALIDATE_INTERVAL = Number(process.env.REVALIDATE_INTERVAL) || 180
export const JWT_SECRET = process.env.NEXT_JWT_SECRET || "key"
export const JWT_PUBLIC_SECRET = process.env.NEXT_JWT_PUBLIC_SECRET || "key"
export const ADMIN_PASS = process.env.NEXT_ADMIN_PASS || "admin"
