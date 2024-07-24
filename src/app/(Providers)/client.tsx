"use client"

import React from "react"

class Client {
  public authorized: boolean
  constructor() {
    this.authorized = false
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
