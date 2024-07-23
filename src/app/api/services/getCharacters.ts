import { Character } from "@/app/types"
import { NEXT_API } from "@/app/variables"

export async function getCharacters(): Promise<Character[]> {
  const res = await fetch(`${NEXT_API}character/list`, { method: "GET" })
  const resData = await res.json()
  const data = resData.result
  return data
}