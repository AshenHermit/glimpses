import { CharacterDetailed } from "@/app/types"
import { NEXT_API } from "@/app/variables"

export async function writeCharacter(code: string, characterData: CharacterDetailed) {
  const body: { code: string; data: CharacterDetailed } = {
    code: code,
    data: characterData,
  }
  const res = await fetch(`${NEXT_API}character/edit`, {
    method: "POST",
    body: JSON.stringify(body),
  })
  const resData = await res.json()
  const data = resData.result
  return data
}
