import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { login } from '../../components/redux/apiCalls'

function Login() {
    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    function handleClick(e){
        e.preventDefault()
        login(dispatch, {email, password})
    }
  return (
    <div style={{
        height:"100vh",
        flexDirection:"column",
        display:"flex",
        alignItems:"center",
        justifyItems:"center",

    }}>
    
      <input style={{padding:"10px", marginBottom:"20px"}} onChange={(e)=>setemail(e.target.value)} 
       type="text" placeholder='username'/>
      <input  style={{padding:"10px", marginBottom:"20px"}}onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='password'  />
      <button onClick={handleClick} style={{padding:"10px"}}>Login</button>
    </div>
  )
}

export default Login
