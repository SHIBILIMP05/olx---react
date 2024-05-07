import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'sonner';


function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handlLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth,email,password).then(()=>{
      toast.success('Your successfully loged')
         navigate('/')
    }).catch((error)=>{
      toast.error(error.message)
    })

  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            value={email}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="lname"
            name="password"
            value={password}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
