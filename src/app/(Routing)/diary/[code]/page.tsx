import { getCharacter } from "@/app/api/services/getCharacter"
import { CharacterDetailed } from "@/app/types"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

export default async function Home({ params }: { params: { code: string } }) {
  let character = await getCharacter(params.code)
  if (character === null) return notFound()

  return (
    <main className="mx-auto flex min-h-screen w-[1000px] max-w-[100vw] flex-col items-center justify-center p-24">
      <div className="flex flex-row flex-wrap items-center justify-center gap-6">
        {character.name}
      </div>
    </main>
  )
}
