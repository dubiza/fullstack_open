import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }
    
    noteService
      .create(noteObject)
      .then(initialNotes => {
        setNotes(notes.concat(initialNotes))
        setNewNote('')
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const handleShowAll = () => setShowAll(!showAll)

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(initialNotes => {
        setNotes(notes.map(note => note.id != id ? note : initialNotes))
      })
      .catch(error => {
        alert(`the note '${note.content}' was deleted from the server`)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={handleShowAll}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App