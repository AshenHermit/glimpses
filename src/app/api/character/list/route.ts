import { NextRequest } from "next/server"
import {
  getCharactersPreviews,
  isCharacterExists,
  handleRequest as processRequest,
  readCharacterData,
  writeCharacterData,
} from "@/app/api/lib"

export async function GET(req: NextRequest) {
  return await processRequest(async () => {
    return await getCharactersPreviews()
  })
}