import React from 'react'
import { Link } from 'react-router-dom'

const Room = ({ roomList }) => {
    return (
        <div className="room">
            <Link to="" className='room-in text-center'>
                {roomList.title}
                <p>(방장 : {roomList.master}님)</p>
            </Link>
        </div>
    )
}

export default Room