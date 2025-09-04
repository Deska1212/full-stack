const Header = (props) =>
{
  const course = props.course
  return (
    <h1>{course}</h1>
  )
}

const Content = (props) =>
{
  const part1 = 'Funadamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return(
    <>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
    </>
  )
}

const Total = (props) =>
{
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return(
    <>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts:
    [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

   return ( 
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

export default App