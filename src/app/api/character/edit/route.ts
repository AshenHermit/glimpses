import { NextRequest } from "next/server"
import {
  isCharacterExists,
  processRequest,
  revalidateCharacter,
  writeCharacterData,
} from "@/app/api/lib"
import { verifyAdminRights } from "../../auth/lib"

export async function POST(req: NextRequest) {
  return await processRequest(async () => {
    verifyAdminRights()

    const { code, data } = await req.json()
    const res = await writeCharacterData(code, data)
    revalidateCharacter(code)
    return res
  })
}
