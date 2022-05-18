import { useState } from 'react'

export const Test = () => {
  const [input, setInput] = useState('')
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
    </div>
  )
}
