import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { auth, fireStore } from '../../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'sonner';

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name === "" && name.length < 4) {
      return toast.error('Name must be at least 4 character')
    } else if (email === "") {
      return toast.error('Please fill the email fields.')
    } else if (!emailPattern.test(email)) {
      return toast.error('Please enter valid email')
    } else if (phone === "" && phone.length < 10) {
      return toast.error('Phone must be at least 10 character')
    } else if (password === "") {
      return toast.error('Please fill the password fields.')
    }
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      const user = result.user
      updateProfile(user, { displayName: name }).then(() => {
        addDoc(collection(fireStore, "users"), {
          id: user.uid,
          name: name,
          phone: phone
        }).then(() => {
          navigate('/login')
        })
      })
    }).catch((Error) => {
      toast.error(Error.message)
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            onChange={(e) => setName(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
            value={name}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={() => navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
