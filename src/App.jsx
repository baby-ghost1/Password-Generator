// import { useCallback, useEffect, useRef, useState } from 'react'

// import './App.css'

// function App() {
//   const [length, setLength] = useState(8)
//   const [number, setNumber] = useState(true)
//   const [character, setCharacter] = useState(true)
//   const [password, setPassword] = useState("")

//   const passwordGenerator = useCallback(() => {
//     let pass = ""
//     let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
//     if(number) str += "0123456789"
//     if(character) str += "!@#$%^&*-_+=[]{}~`"

//     for(let i = 1; i < length; i++){
//       let char = Math.floor(Math.random() * str.length+1)

//       pass += str.charAt(char)
//     }
//     setPassword(pass)
//   }
//   ,[length, number, character, setPassword]) 

//   useEffect(() => {
//     passwordGenerator()
//   }, [length, number, character, passwordGenerator])


//   const passwordRef = useRef(null)

//   const copyPasswordToClipboard = useCallback(() => {
//     passwordRef.current?.focus()
//     passwordRef.current?.select()
//     window.navigator.clipboard.writeText(password)
//   }, [password])

//   return (
//     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 text-orange-500 bg-gray-100'>
//       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
//         <input type="text" 
//         value={password}
//         className='outline-none w-full py-1 px-3'
//         placeholder='Password'
//         readOnly
//         ref={passwordRef}
//         />
//         <button
       
//         onClick={copyPasswordToClipboard}
//         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
//       </div>
//       <div className='flex text-sm gap-x-4 py-2'>
//        <div className='flex items-center gap-x-1'>
//           <input 
//           type="range" 
//           min={6}
//           max={100}
//           value={length}
//           className='cursor-pointer'
//           onChange={(e) => {setLength(e.target.value)}}/>
//           <label htmlFor="">Length: {length}</label>          
//         </div>

//         <div className='flex items-center gap-x-1'>
//           <input 
//           type="checkbox"  
//           defaultChecked={number}
//           id='numberInput'
//           className='cursor-pointer'
//           onChange={() => {setNumber((prev) => !prev)}}/>
//           <label htmlFor="">Numbers</label>          
//         </div>
       
//         <div className='flex items-center gap-x-1'>
//           <input 
//           type="checkbox" 
//           defaultChecked={character}
//           className='cursor-pointer'
//           onChange={() => {setCharacter((prev) => !prev)}}/>
//           <label htmlFor="">Characters</label>          
//         </div>
//       </div>
//     </div>
//   )
// }

// export default App



import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(true);
  const [character, setCharacter] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, number, character]);

  
  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  // Copy
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, password.length);
      navigator.clipboard.writeText(password);

      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    }
  }, [password]);

  
  const getStrength = () => {
    if (length >= 12 && number && character) return "Strong";
    if (length >= 8) return "Medium";
    return "Weak";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="w-full max-w-md shadow-xl rounded-2xl px-6 py-8 bg-white">

       
        <h1 className="text-xl font-bold text-center mb-4 text-black">
          Password Generator
        </h1>

        
        <div className="flex shadow-inner rounded-lg overflow-hidden mb-3">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 bg-gray-100"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            disabled={!password}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        
        <p className="text-sm mb-4 text-gray-600">
          Strength:{" "}
          <span
            className={`font-semibold ${
              getStrength() === "Strong"
                ? "text-green-600"
                : getStrength() === "Medium"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {getStrength()}
          </span>
        </p>

        
        <div className="mb-4">
          <label className="text-sm text-gray-700">
            Length: {length}
          </label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="w-full accent-blue-600 cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        
        <div className="flex justify-between mb-4">

          
          <label className="flex items-center cursor-pointer gap-2">
            <input
              type="checkbox"
              className="sr-only"
              checked={number}
              onChange={() => setNumber((prev) => !prev)}
            />
            <div
              className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ${
                number ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className="bg-white w-4 h-4 rounded-full shadow-md transform duration-300"
                style={{
                  transform: number
                    ? "translateX(20px)"
                    : "translateX(0)",
                }}
              />
            </div>
            <span className="text-sm">Numbers</span>
          </label>

          
          <label className="flex items-center cursor-pointer gap-2">
            <input
              type="checkbox"
              className="sr-only"
              checked={character}
              onChange={() => setCharacter((prev) => !prev)}
            />
            <div
              className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ${
                character ? "bg-purple-500" : "bg-gray-300"
              }`}
            >
              <div
                className="bg-white w-4 h-4 rounded-full shadow-md transform duration-300"
                style={{
                  transform: character
                    ? "translateX(20px)"
                    : "translateX(0)",
                }}
              />
            </div>
            <span className="text-sm">Symbols</span>
          </label>
        </div>

        
        <button
          onClick={passwordGenerator}
          className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-2 mt-1 rounded-lg"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;