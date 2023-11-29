import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { HiX } from "react-icons/hi";

import '../assets/css/login.css'
import logo from '../assets/images/logo.svg'
import InputType from '../components/InputType'
import ButtonType from '../components/ButtonType'

const Registera = () => {
  const initialValues = {
     email: "",
     pass: "",
     repass: ""
  }
  const [formValues, setFormValues] = useState(initialValues);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("에러");
  const navigate = useNavigate();

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]:value});
  }
   
  const handleSubmit = async (e) => {
    e.preventDefault();
     if(validate(formValues)){
       try{
            await createUserWithEmailAndPassword(auth, formValues.email, formValues.pass);
            navigate('/joinend');
       }catch(error){
          console.error('Error creating user', error);
       }
     }
  }

  //폼검증 라이브러리  Formik,  Yup를 이용하면 편하다.
  const validate = (values) => {
     let formError = true;
     //이메일 정규식
     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;   
     //이메일 없을때
     if(!values.email){
        formError = false;
        setError("이메일 주소를 입력해 주세요.");
        setIsError(true);
     }else if(!regex.test(values.email)){
        formError = false;
        //이메일 주소가 아닐 경우
        setError("이메일 형식이 아닙니다.");
        setIsError(true)
     }else if(!values.pass){
        formError = false;
        setError("비밀번호를 입력해 주세요.");  
        setIsError(true)    
     }else if(values.pass.length<6){
        formError = false;
        setError("비밀번호의 길이는 6자 이상이어야 합니다.");  
        setIsError(true) 
     }else if(values.pass !== values.repass){
        formError = false;
        setError("비밀번호가 일치하지 않습니다.");  
        setIsError(true)     
     }
     return formError;
  }


  return (
    <>
    <div className="loginContainer">
      {/* 에러처리 */}
      { isError && <div className="errorbox">
                     <div className="absolute">
                         <HiX onClick={()=> setIsError(false)} />
                     </div>
                     {error}
                   </div>}

      <div className="logo" style={{backgroundImage:`url(${logo})`}}></div>
      <h1 className="text-center">MyChat 회원가입</h1>
      <p>1단계 : 이메일, 비밀번호 등록</p>
      <form className="loginForm">
      <InputType types="text"
                 names="email"
                 values={formValues.email}
                 placeholders="이메일"
                 classNames="input"
                 functions={handleChanges}
      />  
      <InputType types="password"
                 names="pass"
                 values={formValues.pass}
                 placeholders="비밀번호"
                 classNames="input"
                 functions={handleChanges}
      />
      <InputType types="password"
                 names="repass"
                 values={formValues.repass}
                 placeholders="비밀번호확인"
                 classNames="input"
                 functions={handleChanges}
      />
      <ButtonType types="submit"
                  classNames="button"
                  styles={{backgroundColor:"green"}}
                  functions={handleSubmit}
                  text="다음단계"
      />          
      </form>
     </div>
     <Link to="/">회원로그인</Link>
   </>
  )
}

export default Registera