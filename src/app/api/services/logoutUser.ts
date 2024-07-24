import { CharacterDetailed } from "@/app/types"
import { NEXT_API } from "@/app/variables"

export async function logoutUser() {
  const res = await fetch(`${NEXT_API}logout`, {
    method: "POST",
    credentials: "include",
  })
  const resData = await res.json()
  if (resData.error) throw new Error(resData.error)
  const data = resData.result
  return data
}
