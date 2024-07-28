import { CharacterDetailed } from "@/app/types"
import { NEXT_API } from "@/app/variables"

export async function revalidatePath(pathname: string) {
  const body: { pathname: string } = {
    pathname: pathname,
  }
  const res = await fetch(`${NEXT_API}revalidate`, {
    method: "POST",
    body: JSON.stringify(body),
  })
  const resData = await res.json()
  const data = resData.result
  return data
}
