"use client"

import { useSession ,signOut } from 'next-auth/react'

export default function Logout() {
  const {data: session} = useSession()
  return (
    <div>
      Hello!, {session?.user?.email}
      <button onClick={() => signOut()}></button>
    </div>
  )
}
