import { CharacterDetailed } from "@/app/types"
import { NEXT_API } from "@/app/variables"

export async function authorizeUser(password: string) {
  const body: { password: string } = { password: password }
  const res = await fetch(`${NEXT_API}auth`, {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
  })
  const resData = await res.json()
  if (resData.error) throw new Error(resData.error)
  const data = resData.result
  return data
}
