import { NextRequest } from "next/server"
import {
  isCharacterExists,
  handleRequest as processRequest,
  readCharacterData,
  revalidateCharacter,
  writeCharacterData,
} from "@/app/api/lib"
import { revalidatePath } from "next/cache"

export async function POST(req: NextRequest) {
  return await processRequest(async () => {
    const { code, data } = await req.json()
    if (!(await isCharacterExists(code))) {
      const res = await writeCharacterData(code, data)
      revalidateCharacter(code)
      return res
    } else {
      throw new Error("already exists")
    }
  })
}
