import './App.css'
import data from './data.js'
import Header from './components/Header'
import Card from './components/Card'

function App() {
  const travelEntries = data.map( item => {
    return <Card {...item}/>
  })

  return (
    <div className="App">
      <Header />
      {travelEntries}
    </div>
  )
}

export default App
