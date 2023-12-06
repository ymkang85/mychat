import React, { cloneElement, useEffect, useState } from 'react'
import { useAuthValue } from '../context/AuthProvider'
import { db } from '../config/firebase';
import { addDoc, collection, query, onSnapshot, serverTimestamp } from 'firebase/firestore';

import '../assets/css/chatlobby.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import InputType from '../components/InputType';
import ButtonType from '../components/ButtonType';
import Room from '../components/Room';


const ChatLobby = () => {
  const [roomname, setRoomname] = React.useState();
  const { nick, uicon, email } = useAuthValue();

  const { roomList, setRoomList } = useState();


  const getRoom = () => {
    const sql = query(collection(db, 'chatroom'), orderBy("timestamp", "desc"));
    onSnapshot(sql, (res) => {
      const rooms = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setRoomList(rooms);
    })
  }

  const onPress = async () => {
    const dbref = collection(db, 'chatroom');
    await addDoc(dbref, {
      timestamp: serverTimestamp(),
      title: roomname,
      master: nick,
      email
    });
    setRoomname("");
  }

  useEffect(() => {
    getRoom();
  }, [])

  return (
    <>
      <Header nick={nick} uicon={uicon} />
      <div className="lobby-box">
        <h1 className="text-center">방개설</h1>
        <p className="text-center">{nick}님 환영합니다.</p>
        <InputType types="text" names="roomname" values={roomname} functions={(e) => setRoomname(e.target.value)}
          styles={{
            padding: '10px',
            border: '1px solid #999',
            width: '200px',
            borderRadius: '15px',
            backgroundColor: "#ebe5e6",
            display: 'block',
            marginBottom: '10px',
            marginLeft: "auto",
            marginRight: "auto"
          }} />
        <ButtonType types="submit" text="채팅방 만들기" functions={onPress}
          styles={{
            padding: '10px',
            width: '200px',
            borderRadius: '15px',
            border: 'none',
            backgroundColor: '#61A9FD',
            color: "#fff"
          }} />
        <div className="room-list">
          {
            roomList &&
            roomList.map((r, index) => {
              <Room roomList={r}
                key={index}
              />
            })
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ChatLobby