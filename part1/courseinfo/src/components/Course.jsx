const Course = ({course}) => {
    return (
      <>
        <Header text={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }
  
  const Header = ({text}) => {
    console.log('Header ', text)
    return (
      <h1>{text}</h1>
    )
  }
  
  const Content = ({parts}) => {
    console.log('Content ', parts)
    return (
      <>
        {parts.map(part => 
          <Part key={part.id} part={part.name} exercises={part.exercises} />  
        )}
      </>
    )
  }
  
  const Part = ({part, exercises}) => {
    console.log('Part: ', part, 'Exercises: ', exercises)
    return (
      <p>{part} {exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    console.log('Total: ', parts)
    return (
      <p>
        <strong>
          total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
        </strong>
      </p>
    )
  }

  export default Course