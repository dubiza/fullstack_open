import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonFilter = (event) => {
    setPersonFilter(event.target.value)
  }

  const personsToShow = personFilter
    ? persons.filter(person =>
      person.name.toLowerCase().includes(personFilter.toLowerCase()))
    : persons

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already in the phonebook. Would you like to replace the number?`)) {
        const existingPerson = persons.find(person => person.name === newName)
        const changedPerson = {...existingPerson, number: newNumber}

        phonebookService
          .update(changedPerson.id, changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id != changedPerson.id ? person : updatedPerson))
            setSuccessMessage(`${changedPerson.name} successfully updated`)
            setTimeout(() => setSuccessMessage(null), 5000)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      phonebookService
        .create(personObject)
        .then(initialPhonebook => {
          setPersons(persons.concat(initialPhonebook))
          setSuccessMessage(`${personObject.name} successfully added`)
          setTimeout(() => setSuccessMessage(null), 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removeName = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Filter personFilter={personFilter} handlePersonFilter={handlePersonFilter} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        removeName={removeName}
      />
    </div>
  )
}

export default App