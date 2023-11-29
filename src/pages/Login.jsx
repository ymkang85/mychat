import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

import '../assets/css/login.css'
import logo from '../assets/images/logo.svg'
import googleLogin from '../assets/images/google-dark.png'
import InputType from '../components/InputType'
import ButtonType from '../components/ButtonType'

const Login = () => {
  const [useremail, setUseremail] = useState();
  const [userpass, setUserpass] = useState();
  const nav = useNavigate();

  const onPress = async (e) => {
    if (!useremail) {
      alert("이름을 입력하세요.");
      return;
    } else if (!userpass) {
      alert("비밀번호를 입력하세요");
      return;
    } else {
      try {
        const res = await signInWithEmailAndPassword(auth, useremail, userpass);
        const usr = res.user;
        if(!usr){
          alert("아이디, 또는 비밀번호가 틀렸습니다.");
          return;
        }else{
          const user = auth.currentUser;
          if(user.displayName){
            nav("/");
          }else{
            alert("회원가입이 완료되지 않았습니다. \n 회원가입페이지로 이동합니다.");
            nav("/joinend");
          }
        }
      } catch (err) {
        console.error('회원 로그인 도중 에러 발생!!!', err)
      }
    }
  }

  return (
    <>
      <div className="loginContainer">
        <div className="logo" style={{ backgroundImage: `url(${logo})` }}></div>
        <h1 className="text-center">MyChat Login</h1>
        <form className="loginForm">
          <InputType types="text" names="useremail" values={useremail} placeholders="이메일" classNames="input" functions={(e) => setUseremail(e.target.value)} />
          <InputType types="password" names="userpass" values={userpass} placeholders="비밀번호" classNames="input" functions={(e) => setUserpass(e.target.value)} />
          <ButtonType types="submit" classNames="button" functions={onPress} text="로그인" />
        </form>
        <img src={googleLogin} alt="구글로그인" className="google-login" />
      </div>
      <Link to="/join">회원가입</Link>
    </>
  )
}

export default Login