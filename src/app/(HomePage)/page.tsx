import { AddCharacterButton } from "./_components/add-character-button"
import { getCharacters } from "../api/services/getCharacters"
import { CharacterCard } from "./_components/character-card"
import { cookies } from "next/headers"

export default async function Home() {
  const characters = await getCharacters()

  const viewedWelcomeMessage = cookies().get("viewedWelcomeMessage")
  if (viewedWelcomeMessage?.value === "true") {
    return <div>Welcome back!</div>
  }

  return (
    <main className="mx-auto flex min-h-screen w-[1000px] max-w-[100vw] flex-col items-center justify-center p-24">
      <div className="flex flex-row flex-wrap items-center justify-center gap-6">
        {characters.map((char) => (
          <CharacterCard key={char.code} character={char} />
        ))}
        <AddCharacterButton />
      </div>
    </main>
  )
}
