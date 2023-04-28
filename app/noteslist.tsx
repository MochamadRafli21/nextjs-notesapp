'use client'

import { atom, useAtom } from 'jotai'
import NotesCard from './notescard'
import { useEffect } from 'react'

type NoteItem = {
id: number,
    title: string,
    content: string | undefined
}

const initialNote = atom<NoteItem[]>([]) 

export const fetchNotes = atom(
    (get) => (get(initialNote)),
    async (_get, set) => {
        const res = await fetch("/api/notes")
        set(initialNote, (await res.json()))
    }
)


export default function Home() {
    const [notes, update] =  useAtom(fetchNotes)
    useEffect(() => {
        const renderList = async() => {
            await update()
        }

        renderList()
        }, [])
    console.log(notes)
    return (
    <>
    <div className="flex flex-wrap px-8 gap-4">
        {notes.map((note) => <NotesCard id={note.id} title={note.title} content={note.content}/>)}
    </div>
    </>
  )
}
