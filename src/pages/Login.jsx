import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'


import '../assets/css/login.css'
import logo from '../assets/images/logo.svg'
import googleLogin from '../assets/images/google-dark.png'
import InputType from '../components/InputType'
import ButtonType from '../components/ButtonType'

const Login = () => {
  return (
    <>
     <div className="loginContainer">
       <div className="logo" style={{backgroundImage:`url(${logo})`}}></div>
       <h1 className="text-center">MyChat Login</h1>
       <form className="loginForm">
       <InputType types="text"
                  names="useremail"
                  values=""
                  placeholders="이메일"
                  classNames="input"
       />  
       <InputType types="password"
                  names="userpass"
                  values=""
                  placeholders="비밀번호"
                  classNames="input"
                  functions=""
       />
       <ButtonType types="submit"
                   classNames="button"
                   functions=""
                   text="로그인"
       />          
       </form>
       <img src={googleLogin} alt="구글로그인" className="google-login"/>
      </div>
      <Link to="/join">회원가입</Link>
    </>
    )
}

export default Login