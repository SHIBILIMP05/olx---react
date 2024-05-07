import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import { AuthContext } from "./store/firebaseContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import  PostDetails  from "./store/postContext";
function App() {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });
  return (
    <div>
      <PostDetails >
      <Router>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={Login} />
          <Route path="/create" Component={Create} />
          <Route path="/viewPost" Component={ViewPost} />
        </Routes>
      </Router>
      </PostDetails>
    </div>
  );
}

export default App;
