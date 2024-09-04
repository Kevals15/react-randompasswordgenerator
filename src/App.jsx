import { useCallback, useEffect, useRef, useState } from "react"


function App() {
 
const [password,Setpassword] = useState("");
const [length,Setlength]=useState(8);
const [CharacterAllowed,SetCharacterAllowed]=useState(false);
const [NumberAllowed,SetNumberAllowed]=useState(false);

// useref hook

const useref=useRef(null);

const PasswordGenerator = useCallback(()=>{

  let pass="";
  let str="";
  str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(NumberAllowed) str+= "0123456789";
  if(CharacterAllowed) str+= "!@#$%^&*()_+";
  for(let i=1;i<length;i++)
  {
    let random = Math.floor(Math.random()*str.length +1);
    pass+=str.charAt(random);

  }

  Setpassword(pass);

  

},[length,CharacterAllowed,NumberAllowed,Setpassword])



useEffect(()=>{
  PasswordGenerator();
},[length,CharacterAllowed,NumberAllowed,PasswordGenerator]);

const copytext=()=>{
  useref.current?.select();
  navigator.clipboard.writeText(password);
  
}
  return (
    <>
      <div className="w-full bg-black h-screen flex justify-center items-center">
        <div className="w-[80%] p-10 bg-gray-600 text-blue-500 ">
          <h1 className="text-3xl font-bold text-center mb-4">Password Generator</h1>
          <div className="flex relative overflow-hidden">
            <input 
            type="text" 
            className="w-full mx-auto rounded-lg p-4 outline-none font-bold"
            value={password}
            readOnly
            ref={useref}
            />
            <button className="text-white font-bold text-lg p-4 bg-blue-600 absolute rounded-lg right-0 h-full w-[20%] cursor-pointer outline-none shrink-0"
            onClick={copytext}>Copy</button>
          </div>
          <div className="flex gap-5 mt-2">
              
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e)=>{Setlength(e.target.value)}}/>
            <p className="text-lg font-bold text-white">Length: {length}</p>
            <input type="checkbox" 
            defaultChecked={NumberAllowed}
            id="numberInput"
            onChange={()=>{
              SetNumberAllowed((prev)=>!prev);
            }}/>
            <label className="text-lg font-bold text-white">Number</label>
            <input type="checkbox"
            defaultChecked={CharacterAllowed}
            id="characterInput"
            onChange={()=>{
              SetCharacterAllowed((prev)=>!prev);
            }}/>
            <label className="text-lg font-bold text-white">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
