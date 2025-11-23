import Link from "next/link"

import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/responsive-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSession } from "@/lib/auth/get-session"

export default async function Home() {
  const session = await getSession()
  const isAdmin = session?.user.role === "admin"

  return (
    <div className="my-6 px-4 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome {session?.user.name}!</h1>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild size="lg">
            <Link href="/profile">Profile</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/organizations">Organizations</Link>
          </Button>
          {isAdmin && (
            <Button variant="outline" asChild size="lg">
              <Link href="/test">Admin Dashboard</Link>
            </Button>
          )}
          <ResponsiveDialog>
            <ResponsiveDialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </ResponsiveDialogTrigger>

            <ResponsiveDialogContent className="h-[90dvh] custom-dialog-width">
              <ResponsiveDialogHeader>
                <ResponsiveDialogTitle>Edit profile</ResponsiveDialogTitle>
                <ResponsiveDialogDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </ResponsiveDialogDescription>
              </ResponsiveDialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" value="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input id="username" value="@peduarte" className="col-span-3" />
                </div>
              </div>
              <ResponsiveDialogFooter>
                <ResponsiveDialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </ResponsiveDialogClose>
                <Button type="submit">Save changes</Button>
              </ResponsiveDialogFooter>
            </ResponsiveDialogContent>
          </ResponsiveDialog>
        </div>
      </div>
    </div>
  )
}
