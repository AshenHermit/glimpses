"use client"

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
import React from "react"

export function AuthButton() {
  const database = useDatabase() // TODO: useClient
  if (database.authorized) {
    return <AuthorizedState />
  } else {
    return <DefaultState />
  }
}

export function DefaultState() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [error, setError] = React.useState("")
  const [token, setToken] = React.useState("")
  const database = useDatabase() // TODO: useClient

  const onPress = React.useCallback(() => {
    onOpen()
  }, [onOpen])

  const auth = React.useCallback(() => {
    if (token.trim() == "") {
      setError("эм...")
      return
    } else {
      setError("")
    }

    ;(async () => {
      try {
        await database.auth(token)
      } catch (e) {
        if (e instanceof Error) setError(e.message)
      }
    })()
  }, [database, token])

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
                  value={token}
                  onValueChange={setToken}
                  label="Вставьте dropbox access token"
                  isInvalid={!!error}
                  errorMessage={error}
                />

                <div className="text-xs opacity-30">да вся инфа хранится в дропбоксе</div>
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
  const database = useDatabase() // TODO: useClient

  const logout = React.useCallback(() => {
    ;(async () => {
      await database.logout()
    })()
  }, [database])

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
