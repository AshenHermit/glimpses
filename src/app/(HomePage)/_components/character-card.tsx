"use client"

import Image from "next/image"
import { Button, Card, CardBody } from "@nextui-org/react"
import Link from "next/link"
import { Character } from "@/app/types"

export function CharacterCard({ character }: { character: Character }) {
  return (
    <Card as={Link} href={"diary/" + character.code} className="hover:scale-105">
      <CardBody className="border-1 border-default-100 p-0">
        <Image
          width={200}
          height={200}
          alt={character.name}
          className="z-0 max-h-[200px] w-full object-cover"
          src={character.headerImage}
        />
        <Card className="mt-[-15px] overflow-visible bg-neutral-900">
          <CardBody className="flex flex-col items-center gap-0 overflow-visible p-3">
            <Image
              width={200}
              height={200}
              alt={character.name}
              className="z-10 mt-[-120px] h-[200px] rounded-full border-5 border-neutral-900"
              src={character.profileImage}
            />
            <div className="p-4">
              <div className="text-2xl font-semibold text-foreground-500">{character.name}</div>
            </div>
          </CardBody>
        </Card>
      </CardBody>
    </Card>
  )
}
