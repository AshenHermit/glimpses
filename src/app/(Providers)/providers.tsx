import { NextUIProvider } from "@nextui-org/react"
import { ClientProvider } from "./client"
import { checkAuthKey } from "../api/auth/lib"

export function Providers({ children }: { children: React.ReactNode }) {
  const authorized = checkAuthKey()

  return (
    <ClientProvider authorized={authorized}>
      <NextUIProvider>{children}</NextUIProvider>
    </ClientProvider>
  )
}
