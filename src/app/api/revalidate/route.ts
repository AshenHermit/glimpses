import { NextRequest } from "next/server"
import {
  isCharacterExists,
  processRequest,
  revalidateCharacter,
  writeCharacterData,
} from "@/app/api/lib"
import { verifyAdminRights } from "../auth/lib"
import { revalidatePath } from "next/cache"

export async function POST(req: NextRequest) {
  return await processRequest(async () => {
    verifyAdminRights()
    const { pathname } = await req.json()
    revalidatePath(pathname)
    return true
  })
}
