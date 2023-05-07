import { signIn } from 'next-auth/react'
import Login from './modalLogin'
import Register from './modalRegister'

export default function User() {

  return (
    <div className="flex justify-center items-center h-screen" >
      <Login/>
      <Register/>
      <button onClick={() => signIn()}></button>
    </div>
  )
}
