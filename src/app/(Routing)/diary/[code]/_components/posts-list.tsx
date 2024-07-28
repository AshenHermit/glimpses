"use client"

import { useClient, useEditMode } from "@/app/(Providers)/client"
import { CharacterDetailed, CharacterPost } from "@/app/types"
import { Button, Card, CardBody, Textarea } from "@nextui-org/react"
import React from "react"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { useCharacter } from "./character-context"

export function PostsList() {
  const character = useCharacter()
  const client = useClient()
  const { isInEditMode } = useEditMode()

  const addPost = React.useCallback(() => {}, [])

  return (
    <div className="flex w-full flex-col gap-4">
      {character.posts.map((post, i) => {
        return <Post key={post.md} post={post} />
      })}
      {isInEditMode ? (
        <Button size="lg" className="text-2xl" onPress={addPost}>
          +
        </Button>
      ) : (
        ""
      )}
    </div>
  )
}

function Post({ post }: { post: CharacterPost }) {
  const { isInEditMode } = useEditMode()

  const removePost = React.useCallback(() => {}, [])
  const [postMD, setPostMD] = React.useState(post.md)
  const onMDChange = React.useCallback((value: string) => {
    post.md = value
    setPostMD(post.md)
  }, [])

  return (
    <Card className="bg-neutral-900">
      <CardBody className="post flex flex-col gap-2 border-1 border-default-100 p-6 font-thin text-default-600">
        {isInEditMode ? (
          <>
            <div className="flex flex-row justify-end">
              <Button variant="light" className="px-1" onPress={removePost}>
                X
              </Button>
            </div>
            <Textarea
              color="secondary"
              size="lg"
              value={postMD}
              onValueChange={onMDChange}
              maxRows={100}
            />
          </>
        ) : (
          <Markdown rehypePlugins={[rehypeRaw]}>{postMD}</Markdown>
        )}
        {/* Проблема в том, что луч божественной истины, проходя через призму человеческой природы, распадается на множество осколков, и – разрозненные – они лишь тени человеческого заблуждения. Разумеется, Земля относительно Космоса имеет свои границы. Но существует цепь планет, Солнечная система и так далее – в восходящем измерении. Величественная и вечная фантасмагория беспредельного бытия творится до бесконечности. */}
      </CardBody>
    </Card>
  )
}
