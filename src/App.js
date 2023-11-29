import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/css/index.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'

import Login from './pages/Login'
import Registera from './pages/Registera'
import Registerb from './pages/Registerb'
import ChatLobby from './pages/ChatLobby'

const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  const waitForAuthChange = () => {
    return new Promise(resolve => {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLogged(true);
          resolve(); //사용자인증이 성공하면 Promise 를 해결
        }
      });
      return () => unsub(); // 컴포넌트 언마운트 될때(구독이 필요하지 않아질 때) 구독 해제
    });
  };

  //인증상태 변경
  const handleAuthChange = async () => {
    try {
      await waitForAuthChange();
      console.log("사용자가 인증되었음");
    } catch (err) {
      console.error("인증상태 변경 중 오류발생!!", err);
    }
  }

  useEffect(() => {
    handleAuthChange();
  }, []);

  return (
    <Router>
      <div className="container">
        <div className='container-in'>
          <Routes>
            {
              isLogged ? (
                <Route exact path="/" element={<ChatLobby />} />
              ) : (
                <Route exact path="/" element={<Login />} />
              )
            }
            <Route path="/join" element={<Registera />} />
            <Route path="/joinend" element={<Registerb />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App