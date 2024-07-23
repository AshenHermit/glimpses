export const NEXT_API =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_NEXT_URL
    : `http://localhost:${process.env.PORT || 3000}/api/`
export const REVALIDATE_INTERVAL = Number(process.env.REVALIDATE_INTERVAL) || 180
