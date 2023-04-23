'use client'

import React, {useState} from 'react'
export default function NotesModal ()  {
    const [isDisplay, setIsDisplay] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const updateDisplay = ()=>{
        setIsDisplay(!isDisplay)
    }
    async function createNotes(e: React.FormEvent){
        e.preventDefault()
        const data = await fetch(`/api/notes`,{
            method: "POST",
            body: JSON.stringify({title, content})
        })
        if(!data.ok){
            console.log(data)
            return
        }
        setTitle('')
        setContent('')
        updateDisplay()

    }
    return (
            <>
            {isDisplay? <div className='z-10 h-screen flex mx-auto items-center: justify-center w-full bg-gray-50' >
            <form onSubmit={createNotes} className='bg-white h-fit  flex flex-col justify-center items-center '> 
            <input placeholder='title' onChange={(e)=> setTitle(e.target.value)} value={title} />
            <textarea placeholder='content' onChange={(e)=> setContent(e.target.value)} value={content}/>
            <div className='justify-end py-2'>
                <button type='button' onClick={updateDisplay} className='px-4 py-2 mx-2 rounded-lg bg-gray-50 text-red-500 border-gray-400'>Cancel</button>
                <button type='submit' className='px-4 py-2 rounded-lg bg-cyan-200'>Create Notes</button>
            </div>
            </form>
            </div>: 
                <div className='md:w-full my-4 flex justify-center items-center'>
                    <button className='px-4 py-2 rounded-lg bg-cyan-200' onClick={updateDisplay}>Create new notes</button>
                </div>
            }
            </>
          )
}
