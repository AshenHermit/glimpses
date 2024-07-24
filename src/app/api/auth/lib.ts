import { ADMIN_PASS } from "@/app/variables"
import { cookies } from "next/headers"

export const AUTH_KEY_COOKIE = "auth_key"

export function checkAuthKey() {
  const key = cookies().get(AUTH_KEY_COOKIE)?.value
  if (!key) return false
  return key == ADMIN_PASS
}

export function verifyAdminRights() {
  if (checkAuthKey()) {
    return true
  } else {
    throw new Error("no admin rights for this request")
  }
}
