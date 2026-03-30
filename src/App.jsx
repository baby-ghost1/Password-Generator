import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(true)
  const [character, setCharacter] = useState(true)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(number) str += "0123456789"
    if(character) str += "!@#$%^&*-_+=[]{}~`"

    for(let i = 1; i < length; i++){
      let char = Math.floor(Math.random() * str.length+1)

      pass += str.charAt(char)
    }
    setPassword(pass)
  }
  ,[length, number, character, setPassword]) 

  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator])


  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.focus()
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 text-orange-500 bg-gray-100'>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button
       
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-4 py-2'>
       <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}/>
          <label htmlFor="">Length: {length}</label>          
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"  
          defaultChecked={number}
          id='numberInput'
          className='cursor-pointer'
          onChange={() => {setNumber((prev) => !prev)}}/>
          <label htmlFor="">Numbers</label>          
        </div>
       
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={character}
          className='cursor-pointer'
          onChange={() => {setNumber((prev) => !prev)}}/>
          <label htmlFor="">Characters</label>          
        </div>
      </div>
    </div>
  )
}

export default App
