import NotesModal from "./notesmodal"
import NotesCard from "./notescard"
async function getNotes(){
        const data = await fetch(`${process.env.BASE_URL}api/notes`)
        if(!data.ok){
            console.log(data)
        }
        return data.json()
    }

export default async function Home() {
    const notes: {id:number, title:string, content:string|undefined}[] = await getNotes()
    return (
    <main>
    <NotesModal/>

    <div className="flex flex-wrap px-8 gap-4">
        {notes.map((note) => <NotesCard id={note.id} title={note.title} content={note.content}/>)}
    </div>
    </main>
  )
}
