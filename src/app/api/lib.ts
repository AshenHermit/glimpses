import { readdir, readdirSync } from "fs"
import fsPromises from "fs/promises"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import path from "path"

const charactersDir = "data/characters"

export async function handleRequest(process: () => Promise<object | boolean | null>) {
  try {
    const data = await process()
    return NextResponse.json({ result: data, error: "" })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ result: null, error: error.message })
    }
  }
}

export async function readCharacterData(characterCode: string) {
  const dataFilePath = path.join(process.cwd(), `${charactersDir}/${characterCode}.json`)
  let jsonData = ""
  try {
    jsonData = (await fsPromises.readFile(dataFilePath)).toString("utf-8")
    const data = JSON.parse(jsonData)
    return data
  } catch (e) {
    throw new Error(`no such character as "${characterCode}"`)
  }
}

export async function writeCharacterData(characterCode: string, characterData: object) {
  const dataFilePath = path.join(process.cwd(), `${charactersDir}/${characterCode}.json`)
  let jsonData = JSON.stringify(characterData, null, 2)
  try {
    await fsPromises.writeFile(dataFilePath, jsonData)
  } catch (e) {
    throw new Error(`failed to add "${characterCode}" data`)
  }
  return true
}

export async function isCharacterExists(characterCode: string) {
  try {
    await readCharacterData(characterCode)
    return true
  } catch (e) {
    return false
  }
}

export async function getCharactersPreviews() {
  const files = readdirSync(charactersDir)
  const codes = files.map((x) => x.split(".")[0])
  const characters = []
  for (let i = 0; i < codes.length; i++) {
    const code = codes[i]
    const char = await readCharacterData(code)
    delete char["posts"]
    characters.push(char)
  }
  return characters
}

export function revalidateCharacter(code: string) {
  revalidatePath("/")
  revalidatePath(`/${code}`)
}
