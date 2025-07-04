import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const  [length, setLength] = useState(8);
  const  [numberAllowed, setNumberAllowed] = useState(false);
  const  [charAllowed, setCharAllowed] = useState(false);
  const  [password, setPassword] = useState("")
  const  [copyBtn, setCopyBtn] = useState("Copy")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+= "!@#$%^&*()_+{}~`"

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(()=> {
    window.navigator.clipboard.writeText(password)
    setCopyBtn("Copied")
  }, [password])

  useEffect(() =>{
    passwordGenerator()
    setCopyBtn("Copy")
  },[length,numberAllowed,charAllowed,passwordGenerator]) 
  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center py-4'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4 py-4 gap-4'>
            <input 
              type="text"
              value={password} 
              className='outline-none w-full py-1 px-3 bg-white rounded-lg  '
              placeholder='Password'
              readOnly
              ref={passwordRef} 
              />
                  <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 rounded-lg cursor-pointer'>{copyBtn}</button>
          </div>
          <div className='flex text-sm gap-x-2 pb-4'>
              <div className='flex items-center gap-x-1'>
                <input 
                  type="range" 
                  min={6}
                  max={100}
                  value={length}
                  className='cursor-pointer'
                  onChange={(e)=>{setLength(e.target.value)}}
                />
                <label>Length:{length}</label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input 
                  type="checkbox" 
                  defaultChecked={numberAllowed}
                  className='cursor-pointer'
                  onChange={()=>{
                    setNumberAllowed((prev) => !prev)
                  }}
                />
                <label>Numbers</label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input 
                  type="checkbox" 
                  defaultChecked={numberAllowed}
                  className='cursor-pointer'
                  onChange={()=>{
                    setCharAllowed((prev) => !prev)
                  }}
                />
                <label>Characters</label>
              </div>
          </div>
      </div>
    </>
  )
}

export default App
