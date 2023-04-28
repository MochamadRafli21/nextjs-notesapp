'use client'
import {atom, useAtom, useSetAtom} from 'jotai'
import React from 'react'
import { notesId } from './notescard'
import { fetchNotes } from './noteslist'

export const modalDisplayed = atom(false)
export const currentTitle = atom('')
export const currentContent = atom('')

export default function NotesModal ()  {
    const update = useSetAtom(fetchNotes)
    const [isDisplay, setIsDisplay] = useAtom(modalDisplayed)
    const [title, setTitle] = useAtom(currentTitle)
    const [content, setContent] = useAtom(currentContent)
    const [currentNotes] = useAtom(notesId)
    const updateDisplay = ()=>{
        setIsDisplay(!isDisplay)
    }

    async function submitNotes(e: React.FormEvent){
        e.preventDefault()
        if(currentNotes){
            const data = await fetch(`/api/notes/${currentNotes}`,{
                    method: "PUT",
                    body: JSON.stringify({title, content})
                })
        if(!data.ok){
            console.log(data)
            return
        }
        }else{
           const data = await fetch(`/api/notes`,{
                method: "POST",
                body: JSON.stringify({title, content})
            })
        if(!data.ok){
            console.log(data)
            return
        }
        }
        setTitle('')
        setContent('')
        updateDisplay()
        update()
    }
    return (
            <>
            {isDisplay? <div className='z-10 h-screen flex mx-auto items-center: justify-center items-center w-full bg-opacity-10' >
            <form onSubmit={submitNotes} className='bg-white h-fit border-gray-400 border-2 p-4 rounded-xl   flex flex-col justify-center items-center '>
            <div className='flex flex-col'>
            <label>Title</label>
            <input id="title" placeholder='title' className='bg-cyan-50 p-2 rounded-lg border-2 border-gray-100' onChange={(e)=> setTitle(e.target.value)} value={title} />
            <label>Content</label>
            <textarea rows={6} cols={40} placeholder='content' className='bg-cyan-50 p-2 rounded-lg border-2 border-gray-100/' onChange={(e)=> setContent(e.target.value)} value={content}/>
            </div>
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
