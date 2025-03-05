import { BASE_URL } from '@/constant/constant'
import { useEffect, useState } from 'react'
import { io } from "socket.io-client"

export default function Socket() {
    const socket = io(BASE_URL)

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    // useEffect(()=>{

    //     socket.on("message", (msg) => {
    //         console.log(msg);
    //     })
        
    //     socket.emit("message1", (msg1) => {
    //         console.log(msg1);
    //     })

    //     return () => {
    //         socket.off("message")
    //     }

    // }, [])

  return (
    <div>
      
    </div>
  )
}
