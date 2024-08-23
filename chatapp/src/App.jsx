import { useState } from 'react'
import Chat from './pages/Chat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Chat App</h1>
      <Chat/>
    </>
  )
}

export default App
