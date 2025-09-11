import { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0})


  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  const displayAnecdote = () => {
    setSelected((selected + 1) % anecdotes.length)
  }

  const handleUpvote = () => {
    const copyOfVotes = {...votes}
    copyOfVotes[selected] += 1
    setVotes(copyOfVotes)
  }

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good-bad) / total
  const positivePercentage = total === 0 ? 0 : (good / total) * 100

  const votesArray = Object.values(votes)
  const maxVotes = Math.max(...votesArray)
  const highestVotesIndex = votesArray.indexOf(maxVotes)

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={handleGood} text="Good"/>
      <Button onClick={handleNeutral} text="Neutral"/>
      <Button onClick={handleBad} text="Bad"/>

      <h1>statistics</h1>
    
      {(total != 0 ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={total}/>
            <StatisticLine text="average" value={average.toFixed(2)}/>
            <StatisticLine text="positive" value={positivePercentage.toFixed(2)}/>
          </tbody>
        </table>
        ) : (<p>No feedback given</p>)

      )}
        <hr/>
        <Button onClick={displayAnecdote} text="Next Anecdote"/>
        <Button onClick={handleUpvote} text="Upvote"/>
        <p>{anecdotes[selected]} has {votes[selected]} votes</p>
        
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[highestVotesIndex]}</p>
        
    </div>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}

export default App