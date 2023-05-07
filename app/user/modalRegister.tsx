"use client"
import { atom, useAtom } from "jotai"
import {em, pas} from './modalLogin'
const un = atom('')

export default function Register() {
  const [email, setEmail] = useAtom(em)
  const [password, setPassword] = useAtom(pas)
  const [username, setUsername] = useAtom(un)

  async function submitLogin(e: React.FormEvent) {
    e.preventDefault()
    const data = await fetch(`/api/register`, {method:"POST", body:JSON.stringify({"fullname":username, email, password})})
    if(!data.ok){
      console.log(data)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen" >
      <form onSubmit={submitLogin} className="border-2 w-fit rounded-md border-cyan-200 p-2 m-4 flex flex-col">
        <div className="flex flex-col">
          <label><b>Username</b></label>
          <input 
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="bg-gray-200 rounded-md p-1 m-2" type="text" placeholder="Andy Kusuma" />
        </div>
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

        <button className="bg-cyan-200 p-1 m-2 rounded-md" type="submit">Register</button>
      </form>    
    </div>
  )
}
