import React, {useState,useEffect,useRef} from "react"
import './App.css'

function App() {
    const[text, setText] = useState("")
    const[isTime, setIsTime] = useState(5)
    const[start, setStart] = useState(false)
    const[count, setCount] = useState(0)
    
    const input = useRef(null)
    
    function handleChange(e){
        const{value} = e.target
        setText(value)
    }
    
    function countWords(text){
        const words = text.split(" ")
        return words.filter(word => word !== "").length
    }
    
    function begin(){
        setStart(true)
        setIsTime(5)
        setCount(0)
        setText('')
        input.current.disabled = false
        input.current.focus()
    }
    
    useEffect(()=>{
        if (start && isTime > 0){
            setTimeout(()=>{
                setIsTime(prev => prev - 1) 
            },1000) 
        }  else {
            setStart(false)
            setCount(countWords(text))
        }
    },[isTime,start])
        
    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea 
                value = {text}
                onChange = {handleChange}
                ref = {input}
                disabled = {!start}
            />
            <h4>Time reminaing: {isTime} </h4>
            <button disabled={start} onClick={begin}>Start</button>
            <h1>Word count:{count}</h1>
        </div>
    )
}

export default App
