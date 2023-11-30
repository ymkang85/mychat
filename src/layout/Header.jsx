import React from 'react'
import ButtonType from '../components/ButtonType'
import { useNavigate } from 'react-router-dom/dist'
import { auth } from '../config/firebase'
import { signOut } from 'firebase/auth'

const Header = ({ uicon, nick }) => {
    const nav = useNavigate();
    const logout = () => {
        signOut(auth)
            .then(() => {
                nav('/login');
            }).catch((err)=>console.error('logout error'+err));
    }
    return (
        <div className='header'>
            <div className="userinfo">
                <div className="userIcon">
                    <img src={uicon} alt={nick} />
                </div>
                <strong>{nick}</strong>님이 접속하셨습니다.
            </div>
            <ButtonType types="button" classNames="logout" text="로그아웃" functions={logout} styles={{
                margin:"0",
                padding:"5px 10px",
                backgroundColor:"#fd9061"
                }}/>
        </div>
    )
}

export default Header