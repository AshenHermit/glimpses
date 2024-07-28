import { checkAuthKey } from "@/app/api/auth/lib"
import { AuthButton } from "./_components/auth-button"
import { RevalidateButton } from "./_components/revalidate-button"
import classNames from "classnames"

export async function Header() {
  const authorized = checkAuthKey()
  return (
    <div
      className={classNames(
        "z-20 flex w-full items-end justify-end gap-4 bg-transparent bg-opacity-50 p-2",
        { fixed: authorized }
      )}
    >
      <div id="controls-container" className="flx-row flex items-center gap-4"></div>
      <RevalidateButton />
      <AuthButton />
    </div>
  )
}
