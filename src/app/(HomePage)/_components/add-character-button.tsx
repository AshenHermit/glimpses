"use client"

import { useClient } from "@/app/(Providers)/client"
import { addCharacter } from "@/app/api/services/addCharacter"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React from "react"

export function AddCharacterButton() {
  const router = useRouter()
  const client = useClient()
  const add = React.useCallback(async () => {
    const code = prompt("enter character code")
    if (code !== null) await addCharacter(code)
    router.refresh()
  }, [router])

  if (!client.authorized) return null
  return <Button onPress={add}>добавить</Button>
}
