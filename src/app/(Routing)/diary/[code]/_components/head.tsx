"use client"
import { useEditMode } from "@/app/(Providers)/client"
import { CharacterDetailed } from "@/app/types"
import { Button, Card, CardBody, Switch } from "@nextui-org/react"
import Image from "next/image"
import React from "react"
import { createPortal } from "react-dom"
import { useCharacter } from "./character-context"

export function Head() {
  const character = useCharacter()
  const { isInEditMode, setEditMode } = useEditMode()

  return (
    <Card className="w-full">
      <CardBody className="border-1 border-default-100 p-0">
        <Image
          className="z-0 max-h-[200px] w-full object-cover"
          src={character.headerImage}
          width={798}
          height={200}
          alt={character.name}
        />
        <Card className="mt-[-15px] overflow-visible bg-neutral-900">
          <CardBody className="flex flex-col items-center gap-0 overflow-visible p-3">
            <Image
              width={200}
              height={200}
              alt={character.name}
              className="z-10 mt-[-120px] h-[200px] w-[200px] rounded-full border-5 border-neutral-900 object-cover"
              src={character.profileImage}
            />
            <div className="flex flex-col items-center gap-2 p-4">
              <div className="text-2xl font-semibold text-foreground-500">{character.name}</div>
              <div className="text-md font-semibold text-foreground-300">
                на сегодняшний день: мертв/мертва
              </div>
            </div>
          </CardBody>
        </Card>
      </CardBody>
    </Card>
  )
}
