const Persons = ({ personsToShow, removeName }) => {
  return (
    <>
      {personsToShow.map(person =>
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => removeName(person.id, person.name)}>delete</button>
        </div>
      )}
    </>
  )
}

export default Persons