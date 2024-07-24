import { NextRequest } from "next/server"
import { processRequest } from "@/app/api/lib"
import jwt from "jsonwebtoken"
import { ADMIN_PASS, JWT_PUBLIC_SECRET, JWT_SECRET } from "@/app/variables"

export async function POST(req: NextRequest) {
  let authorized = false
  const res = await processRequest(async () => {
    const { password } = await req.json()
    authorized = ADMIN_PASS == password
    return true
  })
  if (authorized) {
    res?.cookies.set("auth_key", ADMIN_PASS)
  }
  return res
}

export async function GET(req: NextRequest) {
  return await processRequest(async () => {
    req.cookies.get("auth_key")
    return true
  })
}
