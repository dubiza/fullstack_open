import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [personFilter, setPersonFilter] = useState('')

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
                number: newNumber,
                id: persons.length + 1
            }
            setPersons(persons.concat(personObject))
        }
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter personFilter={personFilter} handlePersonFilter={handlePersonFilter}/>
            <h2>add a new</h2>
            <PersonForm 
                addName={addName}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow}/>
        </div>
    )
}

export default App