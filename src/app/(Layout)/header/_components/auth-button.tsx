"use client"

import { useClient } from "@/app/(Providers)/client"
import { authorizeUser } from "@/app/api/services/authorizeUser"
import { logoutUser } from "@/app/api/services/logoutUser"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React from "react"

export function AuthButton() {
  const client = useClient() // TODO: useClient
  if (client.authorized) {
    return <AuthorizedState />
  } else {
    return <DefaultState />
  }
}

export function DefaultState() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [error, setError] = React.useState("")
  const [pass, setPass] = React.useState("")
  const client = useClient() // TODO: useClient
  const router = useRouter()

  const onPress = React.useCallback(() => {
    onOpen()
  }, [onOpen])

  const auth = React.useCallback(() => {
    if (pass.trim() == "") {
      setError("эм...")
      return
    } else {
      setError("")
    }

    ;(async () => {
      try {
        await authorizeUser(pass)
        router.refresh()
      } catch (e) {
        if (e instanceof Error) setError(e.message)
      }
    })()
  }, [pass, router])

  return (
    <>
      <Button onPress={onPress}>DB auth</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Авторизация в базе</ModalHeader>
              <ModalBody>
                <Textarea
                  value={pass}
                  onValueChange={setPass}
                  label="Вставьте токен"
                  isInvalid={!!error}
                  errorMessage={error}
                />

                <div className="text-xs opacity-30">открывает доступ к редактированию</div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Закрыть
                </Button>
                <Button color="primary" onPress={auth}>
                  Авторизоваться
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export function AuthorizedState() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const client = useClient() // TODO: useClient
  const router = useRouter()

  const logout = React.useCallback(() => {
    ;(async () => {
      await logoutUser()
      router.refresh()
    })()
  }, [router])

  return (
    <>
      <Button onPress={onOpen}>База данных авторизована</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Выйти из сессии базы?</ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Закрыть
                </Button>
                <Button color="danger" onPress={logout}>
                  Выйти
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
