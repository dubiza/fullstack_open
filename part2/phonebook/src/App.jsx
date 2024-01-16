import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [personFilter, setPersonFilter] = useState('')

    useEffect(() => {
      phonebookService
        .getAll()
        .then(initialPhonebook => {
          console.log('setting initial phonebook data')
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
            alert(`${newName} is already in the phonebook`)
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }

            phonebookService
              .create(personObject)
              .then(initialPhonebook => {
                setPersons(persons.concat(initialPhonebook))
                setNewName('')
                setNewNumber('')
              })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
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
            <Persons personsToShow={personsToShow} />
        </div>
    )
}

export default App