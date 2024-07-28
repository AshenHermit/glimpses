"use client"

import { EventHandler } from "event-js"
import React from "react"

class Client {
  public authorized: boolean
  public isInEditMode: boolean
  public editModeChangeEvent: EventHandler
  constructor() {
    this.authorized = false
    this.isInEditMode = false
    this.editModeChangeEvent = new EventHandler(this)
  }
  public setEditMode(value: boolean) {
    this.isInEditMode = value
    this.editModeChangeEvent.publish(this.isInEditMode)
  }
}

const ClientContext = React.createContext(new Client())

export function ClientProvider({
  authorized,
  children,
}: {
  authorized: boolean
  children: React.ReactElement
}) {
  const client = React.useMemo(() => new Client(), [])
  client.authorized = authorized
  return <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
}

export function useClient() {
  return React.useContext(ClientContext)
}

export function useEditMode() {
  const client = useClient()
  const [isInEditMode, setEditMode] = React.useState(client.isInEditMode)
  React.useEffect(() => {
    client.editModeChangeEvent.subscribe(setEditMode)
    return () => {
      client.editModeChangeEvent.unsubscribe(setEditMode)
    }
  }, [client.editModeChangeEvent, setEditMode])

  return { isInEditMode: isInEditMode, setEditMode: client.setEditMode.bind(client) }
}
