import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { sendCount } from './api'
import { useParams } from 'react-router-dom'

export default function CounterPage(){
    const params = useParams()
    const [count, setCount] = useState(parseInt(localStorage.getItem("count")))

    useEffect(()=>{
      sendCount(count, localStorage.getItem("id"))
    }, [count])

    useEffect(()=>{
      localStorage.setItem("count", count)
    }, [count])

    return (
        <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {
          setCount((count) => 1 + count)
        }}>
          count is {count}
        </button>
      </div>
    </>
    )
}