import { getCharacter } from "@/app/api/services/getCharacter"
import { CharacterDetailed } from "@/app/types"
import { cookies } from "next/headers"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Head } from "./_components/head"
import { PostsList } from "./_components/posts-list"
import { Controls } from "./_components/controls"
import { CharacterProvider } from "./_components/character-context"

export default async function Diary({ params }: { params: { code: string } }) {
  let character = await getCharacter(params.code)
  if (character === null) return notFound()

  return (
    <main className="mx-auto flex min-h-screen w-[798px] max-w-[100vw] flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[798] flex-row flex-wrap items-center justify-center gap-6">
        <CharacterProvider character={character}>
          <Controls />
          <Head />
          <PostsList />
        </CharacterProvider>
      </div>
    </main>
  )
}
