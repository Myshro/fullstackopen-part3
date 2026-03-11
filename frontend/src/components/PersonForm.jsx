const Persons = ({ newName, newNumber, handlePersonChange, handleNumberChange }) => {
  return (
    <>
    <div>
      name: <input value={newName} onChange={handlePersonChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    </>
  )
}

export default Persons