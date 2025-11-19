"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth/auth-client"

export function SignOutButton() {
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/auth/sign-in'
        },
      },
    })
  }

  return (
    <Button
      size="lg"
      variant="destructive"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  )
}
