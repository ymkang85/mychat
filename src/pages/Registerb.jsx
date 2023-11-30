import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, storage } from '../config/firebase'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import { v4 } from 'uuid'

import '../assets/css/login.css'
import logo from '../assets/images/logo.svg'
import InputType from '../components/InputType'
import ButtonType from '../components/ButtonType'

const Registerb = () => {
   const [nick, setNick] = useState();
   const [userIcon, setUserIcon] = useState();
   const [userImg, setUserImg] = useState();
   const [fileName, setFileName] = useState();

   const navigate = useNavigate();
   const user = auth.currentUser;

   const encodeFileToBase64 = (fileB) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileB);
      return new Promise((res) => {
         reader.onload = () => {
            setUserIcon(reader.result);
            res();
         }
      })
   }

   //파일확장자 추출함수
   const extExt = (filename) => {
      //마지막에 있는 점의 위치
      const lastDot = filename.lastIndexOf(".");
      //subString 함수로 마지막 부분만 추출 , 모두 소문자로 변환
      return filename.substring(lastDot, filename.length).toLowerCase();
   }

   const imgChange = (e) => {
      const newIcon = e.target.files[0];
      encodeFileToBase64(newIcon);
      setUserIcon(newIcon);
      setFileName(newIcon.name);
      setUserImg(e.target.files[0]);
      console.log(extExt(fileName));
   }

   const onPress = async (e) => {
      e.preventDefault();
      let photoURL = '';
      if (fileName !== null) {
         try {
            //확장자 추출
            const fileExt = extExt(fileName);
            const imgRef = ref(storage, `userdata/${v4()}${fileExt}`);
            await uploadBytes(imgRef, userImg);
            photoURL = await getDownloadURL(imgRef);
         } catch (err) {
            console.error('Error image upload :', err);
         }
      } //if
      try {
         await updateProfile(
            user, {
            displayName: nick,
            photoURL
         }
         )
      } catch (err) {
         console.error('Error user update profile :', err);
      }
      navigate('/');
   }

   return (
      <>
         <div className="loginContainer">
            <div className="logo"
               style={{
                  backgroundImage: `url(${logo})`,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '1px solid #ddd'
               }}>
               {
                  fileName && <img src={userIcon} alt={fileName} />
               }
            </div>
            <h1 className="text-center">MyChat 회원가입</h1>
            <p>2단계 : 닉네임(필수), 이미지아이콘(선택) 등록</p>
            <form className="loginForm" method="post">
               <InputType types="text"
                  names="nick"
                  values={nick}
                  placeholders="닉네임"
                  classNames="input"
                  functions={(e) => setNick(e.target.value)}
               />
               <div className="filebox">
                  <input type="file" hidden id="myfile" onInput={imgChange} />
                  <label htmlFor="myfile"
                     style={{
                        color: '#333',
                        padding: "0.1rem 0.5rem",
                        borderRadius: '0.3rem',
                        cursor: 'pointer',
                        marginTop: '2rem',
                        marginRight: '0.5rem',
                        backgroundColor: "#ddd"
                     }}
                  >이미지선택</label>
                  {fileName}
               </div>
               <ButtonType types="submit"
                  classNames="button"
                  styles={{ backgroundColor: "green" }}
                  functions={onPress}
                  text="회원가입완료"
               />
            </form>
         </div>
         <Link to="/">회원로그인</Link>
      </>
   )
}

export default Registerb