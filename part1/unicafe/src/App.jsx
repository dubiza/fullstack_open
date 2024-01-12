import { useState } from 'react'

const Heading = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({text, value}) => <tr><th>{text}</th><td>{value}</td></tr>

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  else {
    return (
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive + "%"} />
        </tbody>
      </table>
    )

  }
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  const totalResults = good + neutral + bad

  const average = () => {
    if (totalResults === 0) {
      return 0
    }
    const totalScore = (good * 1) + (neutral * 0) + (bad * -1)
    return totalScore / totalResults
  }

  const positive = () => {
    if (totalResults === 0) {
      return 0
    }
    return good / totalResults * 100
  }

  return (
    <div>
      <Heading text="give feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Heading text="statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={totalResults}
        average={average()}
        positive={positive()}
      />
    </div>
  )
}

export default App