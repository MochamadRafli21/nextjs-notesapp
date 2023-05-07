
"use client"
import { atom, useAtom } from "jotai"
import Link from "next/link"

export const em = atom('')
export const pas = atom('')

export default function Login() {
  const [email, setEmail] = useAtom(em)
  const [password, setPassword] = useAtom(pas)

  async function submitLogin(e: React.FormEvent) {
    e.preventDefault()
    const data = await fetch(`/api/login`, {method:"POST", body:JSON.stringify({email, password})})
    if(!data.ok){
      console.log(data)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen" >
      <form onSubmit={submitLogin} className="border-2 w-fit rounded-md border-cyan-200 p-2 m-4 flex flex-col">
        <div className="flex flex-col">
          <label><b>Email</b></label>
          <input 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="bg-gray-200 rounded-md p-1 m-2" type="email" placeholder="email@gmail.com" />
        </div>
        <div className="flex flex-col">
          <label><b>Password</b></label>
          <input 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="bg-gray-200 rounded-md p-1 m-2"
          type="password" placeholder="*********" />
        </div>

        <button className="bg-cyan-200 p-1 m-2 rounded-md" type="submit">Login</button>
        <Link className="text-cyan-600" href={"/register"}> Dont have account Click here</Link>
      </form>    
    </div>
  )
}
