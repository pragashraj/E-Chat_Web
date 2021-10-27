import React from 'react'

import ChatMessage from '../../components/ChatMessage'

import './Home.css'
import {endUserColor, secondaryUserColor} from '../../values/values'

const Chat = ({chats}) => {

    const renderMessageType1 = (item) => {
        return (
            <div className = "message_type_1" key = {item.id}>
                <div className = "message_type_blog">
                    <ChatMessage avatar = "P" message = {item.message} bgcolor = {endUserColor}/>
                    <span className = "message_type_1_date">{item.dateTime}</span>
                </div>
            </div>
        )
    }

    const renderMessageType2 = (item) => {
        return (
            <div className = "message_type_2" key = {item.id}>
                <div className = "message_type_blog">
                    <ChatMessage avatar = "S" message = {item.message} bgcolor = {secondaryUserColor}/>
                    <span className = "message_type_2_date">{item.dateTime}</span>
                </div>
            </div>
        )
    }

    return (
        <div className = "chat_list_body_root">
            <div className = "chat_list_body">
                { chats.map(item => item.owner === "own" ? renderMessageType1(item) : renderMessageType2(item)) }
            </div>
        </div>
    )
}

export default Chat