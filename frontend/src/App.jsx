import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import phonebook from './services/phonebook'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setsuccessMessage] = useState(null)

  useEffect(() => {
    phonebook
      .getAll()
      .then(res => setPersons(res))
  }, [])

  const handlePersonChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const deletePersonOn = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      phonebook
        .remove(id)
        .then(res => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const addPerson = event => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    
    if (persons.some(person => person.name === newName)) {
      const person = persons.find(p => p.name === newName)

      if (window.confirm(`${person.name} already exists, replace the old number with a new one?`)) {
        const updatedPerson = { ...person, number: newNumber }

        phonebook
          .update(person.id, updatedPerson)
          .then(res => {
            setPersons(persons.map(p => p.id !== person.id ? p : res))
            setNewName('')
            setNewNumber('')
          })

        return
      }
    }

    phonebook
      .create(newObject)
      .then(res => {
        setPersons(persons.concat(newObject))
        setNewName('')
        setNewNumber('')
        setsuccessMessage(`Added ${res.name}`)

        setTimeout(() => {
          setsuccessMessage(null)
        }, 5000)
      })
  } 

  const personsToShow = persons.filter(person => 
    person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())   
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <div>
        filter shown with <Filter value={filter} handler={handleFilterChange} />
      </div>
      <form onSubmit={addPerson}>
        <PersonForm 
          newName={newName} 
          newNumber={newNumber} 
          handlePersonChange={handlePersonChange} 
          handleNumberChange={handleNumberChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Persons persons={personsToShow} deletePerson={deletePersonOn} />
    </div>
  )
}

export default App