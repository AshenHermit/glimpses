"use client"

import { CharacterDetailed } from "@/app/types"
import React, { ReactElement } from "react"

const CharacterContext = React.createContext<CharacterDetailed>({
  code: "default",
  headerImage: "https://i.pinimg.com/564x/82/00/39/82003998cd370abc112a57ea57e7bad0.jpg",
  profileImage: "https://i.pinimg.com/564x/af/5e/7d/af5e7de18b0dfd45ac06acad692b84c9.jpg",
  name: "default",
  posts: [],
})

export function CharacterProvider({
  character,
  children,
}: {
  character: CharacterDetailed
  children: ReactElement | ReactElement[]
}) {
  return <CharacterContext.Provider value={character}>{children}</CharacterContext.Provider>
}
export function useCharacter() {
  return React.useContext(CharacterContext)
}
