import Places from './components/Places'
import Events from './components/Events'
import './styles/index.css'

function App() {
  return (
    <div className="App">
      <h1 className="title">Accenture Assignment</h1>
      <Places />
      <hr />
      <Events />
      <div className="footer">
        <p>Copyright © 2021</p>
      </div>
    </div>
  )
}

export default App
