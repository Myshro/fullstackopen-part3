const Persons = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      ))}
    </ul>
  )
}

export default Persons