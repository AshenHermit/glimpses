"use client"

import { useClient } from "@/app/(Providers)/client"
import { revalidatePath } from "@/app/api/services/revalidatePath"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React from "react"

export function RevalidateButton() {
  const router = useRouter()
  const revalidate = React.useCallback(async () => {
    await revalidatePath(window.location.pathname)
    router.refresh()
  }, [router])

  const client = useClient() // TODO: useClient
  if (!client.authorized) return null
  return (
    <Button variant="light" onPress={revalidate}>
      revalidate
    </Button>
  )
}
