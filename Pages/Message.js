import React,{useRef} from 'react'
import MessageComponent from '../Component/MessagePage/Message'

export default function Message({socket}) {

  return (
    <div>
      <MessageComponent socket={socket}/>
    </div>
  )
}
