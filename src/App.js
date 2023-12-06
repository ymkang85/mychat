import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/css/index.css'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './config/firebase'

import { AuthProvider } from './context/AuthProvider'
import Login from './pages/Login'
import ChatLobby from './pages/ChatLobby'
import Registera from './pages/Registera'
import Registerb from './pages/Registerb'

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState();
  const [nick, setNick] = useState();
  const [uicon, setUicon] = useState();

  const waitForAuthChange = () => {
    return new Promise(resolve => {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLogged(true);
          setEmail(user.email);
          setNick(user.displayName);
          setUicon(user.photoURL);
          resolve(); //사용자 인증이 성공하면 Promise를 해결
        }
      });
      return () => unsub(); //컴포넌트 언마운트될때(구독이 필요하지 않아질 때) 구독 해제
    });
  };

  //인증상태 변경
  const handleAuthChange = async () => {
    try {
      await waitForAuthChange();
      console.log("사용자가 인증되었음!");
    } catch (error) {
      console.error("인증상태 변경 중 오류!", error);
    }
  }

  useEffect(() => {
    handleAuthChange();
  }, []);

  return (
    <Router>
      <div className="container">
        <div className='container-in'>
          <AuthProvider value={{ email, nick, uicon }}>
            <Routes>
              {
                isLogged ? (
                  <Route exact path="/" element={<ChatLobby />} />
                ) : (
                  <Route exact path="/" element={<Login />} />
                )
              }
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Registera />} />
              <Route path="/joinend" element={<Registerb />} />
            </Routes>
          </AuthProvider>
        </div>
      </div>
    </Router>
  )
}

export default App