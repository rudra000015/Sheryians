import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import axios from "axios"

function App() {

  const [notes, setNotes] = useState([{
    title: "tt-1",
    description: "dd-1"
  }, {
    title: "tt-1",
    description: "dd-1"
  }, {
    title: "tt-1",
    description: "dd-1"
  }, {
    title: "tt-1",
    description: "dd-1"
  }])

  useEffect(() => {
    axios.get("http://localhost:3000/notes").then((res) => {
      setNotes(res.data.notes);
    }).catch((err) => {
      console.error("Error fetching notes:", err);
    })
  }, [])





  async function handleform(e) {
    console.log("workng");

    e.preventDefault();
    const { title, description } = e.target.elements;
    console.log(title.value, description.value);

    await axios.post("http://localhost:3000/notes", {
      title: title.value,
      description: description.value
    }).then(res => {
      console.log(res.data);
      // Add the new note to the state
      setNotes([...notes, res.data.note]);
      // Clear the form
    }).catch(err => {
      console.error("Error creating note:", err);
    })
  }

  async function handledelete(noteId){
   await axios.delete("http://localhost:3000/notes/"+noteId).then(res=>{
      console.log(res.data);
      // Remove the deleted note from the state
      setNotes(notes.filter(note => note._id !== noteId));
    }).catch(err => {
      console.error("Error deleting note:", err);
    })
  }

  return (
    <>

      <form className='note-form' onSubmit={handleform}>
        <input name='title' type="text" placeholder='enter title' />
        <input name='description' type="text" placeholder='enter description' />
        <button>Create note</button>
      </form>
      <div className="notes">
        {notes.map(note => {
          return <div className="note">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={()=>{
              handledelete(note._id)
            }}>delete</button>
          </div>
        })}
      </div>
    </>
  )
}

export default App
