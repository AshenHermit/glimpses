import { NextRequest } from "next/server"
import { processRequest, readCharacterData } from "@/app/api/lib"

export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
  return await processRequest(async () => {
    const data = await readCharacterData(params.code)
    return data
  })
}
