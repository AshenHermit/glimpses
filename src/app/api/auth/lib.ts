import { ADMIN_PASS } from "@/app/variables"
import { cookies } from "next/headers"

export function checkAuthKey() {
  const key = cookies().get("auth_key")?.value
  if (!key) return false
  return key == ADMIN_PASS
}
