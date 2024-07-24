import { NextRequest } from "next/server"
import { processRequest } from "@/app/api/lib"
import jwt from "jsonwebtoken"
import { ADMIN_PASS, JWT_PUBLIC_SECRET, JWT_SECRET } from "@/app/variables"
import { AUTH_KEY_COOKIE } from "../auth/lib"

export async function POST(req: NextRequest) {
  const res = await processRequest(async () => {
    return true
  })
  res?.cookies.set(AUTH_KEY_COOKIE, "deleted")
  return res
}
