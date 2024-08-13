import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

/*
length: Stores the length of the password (default is 8).
numberAllowed: A boolean that determines if numbers are allowed in the password.
charAllowed: A boolean that determines if special characters are allowed in the password.
password: Stores the generated password string.
*/

  //useRef hook
  const passwordRef = useRef(null)
  /*
  passwordRef: A reference to the password input field. This allows direct manipulation of the DOM element, such as selecting and copying the text.
  */

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char) 
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  /*
  passwordGenerator Function
Purpose: Generates a random password based on the selected options.
Logic:
Start with an initial string str containing uppercase and lowercase alphabets.
If numberAllowed is true, numbers 0123456789 are added to str.
If charAllowed is true, special characters !@#$%^&*-_+=[]{}~`` are added to str`.
A loop runs for the number of times specified by length, selecting a random character from str and appending it to the password string (pass).
The generated password is then set to the password state using setPassword.
  
  */

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  /*
  copyPasswordToClipboard Function
  Purpose: Copies the generated password to the clipboard.
  Logic:
  Select the password input element and set its selection range to the first and last characters of the password string.
  */

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    
/*
/*
  useEffect Hook
This hook automatically generates a new password every time the
 length, numberAllowed, or charAllowed state changes. The passwordGenerator function is 
 called as a side effect whenever these dependencies are updated.
 */

<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    
/*
JSX Return
<div className="w-full max-w-md ...">: This is the container div for the entire app, styled with Tailwind CSS classes.
Password Display:
An <input> field displays the generated password and is read-only, so the user can't modify it directly.
A Copy button next to the input field triggers the copyPasswordToClipboard function.
Options:
A slider (<input type="range">) allows the user to set the password length (between 6 and 100).
Two checkboxes allow the user to toggle the inclusion of numbers and special characters.
*/

  )
}

export default App;
