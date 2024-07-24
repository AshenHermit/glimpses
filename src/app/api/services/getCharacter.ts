import { Character, CharacterDetailed } from "@/app/types"
import { NEXT_API } from "@/app/variables"

export async function getCharacter(code: string): Promise<CharacterDetailed | null> {
  const res = await fetch(`${NEXT_API}character/${code}`, { method: "GET" })
  const resData = await res.json()
  if (resData.error) return null
  const data = resData.result
  return data
}
