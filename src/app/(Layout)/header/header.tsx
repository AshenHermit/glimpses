import { AuthButton } from "./_components/auth-button"

export async function Header() {
  return (
    <div className="fixed w-full bg-black bg-opacity-50 p-2">
      <AuthButton />
    </div>
  )
}
