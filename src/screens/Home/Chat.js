import React from 'react'

import ChatMessage from '../../components/ChatMessage'
import {Text} from '../../components/skeletons/index'

import './Home.css'
import {endUserColor, secondaryUserColor} from '../../values/values'

const Chat = ({selectedChatItem, currentUser}) => {

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

    const renderListSkeleton = () => {
        return (
            <div className = "chat_list_body">
                {
                    ["Own", "Op"].map((item, idx) => {
                        if (item === "Own") {
                            return (
                                <div className = "message_type_1" key = {idx}>
                                    <div className = "message_type_blog">
                                        <Text width = {150} height = {45}/>
                                    </div>
                                </div>
                            )
                        } 
                        else {
                            return (
                                <div className = "message_type_2" key = {idx}>
                                    <div className = "message_type_blog">
                                        <Text width = {130} height = {45}/>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }

    const renderList = () => {
        return (
            <div className = "chat_list_body">
                { selectedChatItem && selectedChatItem.messages.map(item => 
                    item.sender.username === currentUser.username ? renderMessageType1(item) : renderMessageType2(item)) 
                }
            </div>
        )
    }

    return (
        <div className = "chat_list_body_root">
            { selectedChatItem ? renderList () : renderListSkeleton() }
        </div>
    )
}

export default Chat