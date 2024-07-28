import { NextRequest } from "next/server"
import { processRequest } from "@/app/api/lib"
import jwt from "jsonwebtoken"
import { ADMIN_PASS, JWT_PUBLIC_SECRET, JWT_SECRET } from "@/app/variables"
import { AUTH_KEY_COOKIE } from "./lib"

export async function POST(req: NextRequest) {
  let authorized = false
  const res = await processRequest(async () => {
    const { password } = await req.json()
    authorized = ADMIN_PASS == password
    if (!authorized) throw Error("incorrect password")
    return true
  })
  if (authorized) {
    const oneDay = 24 * 60 * 60 * 1000
    res?.cookies.set(AUTH_KEY_COOKIE, ADMIN_PASS, { expires: Date.now() + oneDay * 30 })
  }
  return res
}
