import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AutocompleteSearch from './components/AutocompleteSearch';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AutocompleteSearch />
    </>
  )
}

export default App
