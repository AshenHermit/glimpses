import { CharacterDetailed } from "@/app/types"
import { NEXT_API } from "@/app/variables"

export async function addCharacter(code: string) {
  const body: { code: string; data: CharacterDetailed } = {
    code: code,
    data: {
      code: code,
      headerImage: "https://i.pinimg.com/564x/82/00/39/82003998cd370abc112a57ea57e7bad0.jpg",
      profileImage: "https://i.pinimg.com/564x/af/5e/7d/af5e7de18b0dfd45ac06acad692b84c9.jpg",
      name: code,
      posts: [],
    },
  }
  const res = await fetch(`${NEXT_API}character/add`, {
    method: "POST",
    body: JSON.stringify(body),
  })
  const resData = await res.json()
  const data = resData.result
  return data
}
