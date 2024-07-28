"use client"
import { useClient, useEditMode } from "@/app/(Providers)/client"
import { writeCharacter } from "@/app/api/services/writeCharacter"
import { CharacterDetailed } from "@/app/types"
import { Button, Card, CardBody, Switch } from "@nextui-org/react"
import Image from "next/image"
import React from "react"
import { createPortal } from "react-dom"
import { useCharacter } from "./character-context"

export function Controls() {
  const client = useClient()
  const character = useCharacter()
  const { isInEditMode, setEditMode } = useEditMode()
  const [controlsContainer, setControlsContainer] = React.useState<null | HTMLElement>(null)
  React.useEffect(() => {
    setControlsContainer(document.getElementById("controls-container"))
  }, [controlsContainer])

  const [buttonText, setButtonText] = React.useState("Сохранить")

  const save = React.useCallback(async () => {
    setButtonText("Сохраняем...")
    try {
      const res = await writeCharacter(character.code, character)
      setButtonText("Сохранено!")
    } catch (e) {
      if (e instanceof Error) {
        setButtonText(e.message)
        console.error(e.message)
      }
    }
    setTimeout(() => {
      setButtonText("Сохранить")
    }, 2000)
  }, [character])

  if (!client.authorized) return null
  return controlsContainer
    ? createPortal(
        <>
          <Switch value={"" + isInEditMode} size="sm" onValueChange={setEditMode}>
            Edit
          </Switch>
          <Button onPress={save}>{buttonText}</Button>
        </>,
        controlsContainer as Element
      )
    : null
}
