import React from 'react'

import moment from 'moment'

import ChatMessage from '../../components/ChatMessage'
import EmojiMessage from '../../components/EmojiMessage'
import {Text} from '../../components/skeletons/index'

import './Home.css'
import {endUserColor, secondaryUserColor} from '../../values/values'

const Chat = ({selectedChatItem, currentUser}) => {

    const getDateTime = (dateTime) => {
        return moment(dateTime).format("DD MMM hh:mm a")
    }

    const getAvatar = (item) => {
        if (item.sender) {
            return item.sender.charAt(0)
        }
        else {
            return ""
        }
    }

    const renderMessageType1 = (item) => {
        return (
            <div className = "message_type_1" key = {item.id}>
                <div className = "message_type_blog">
                    { 
                        item.contentType === 'EMOJI' ? 
                        <EmojiMessage avatar = {getAvatar(item)} message = {item.message}/>
                        :
                        <ChatMessage avatar = {getAvatar(item)} message = {item.message} bgcolor = {endUserColor}/>
                    }
                    <span className = "message_type_1_date">{getDateTime(item.dateTime)}</span>
                </div>
            </div>
        )
    }

    const renderMessageType2 = (item) => {
        const {randX, randY} = selectedChatItem
        const bgColor = selectedChatItem ? `rgb(${randX}, ${randY}, 0)` : secondaryUserColor
        return (
            <div className = "message_type_2" key = {item.id}>
                <div className = "message_type_blog">
                    { 
                        item.contentType === 'EMOJI' ? 
                        <EmojiMessage avatar = {getAvatar(item)} message = {item.message}/>
                        :
                        <ChatMessage avatar = {getAvatar(item)} message = {item.message} bgcolor = {bgColor}/>
                    }
                    <span className = "message_type_2_date">{getDateTime(item.dateTime)}</span>
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
                { selectedChatItem && selectedChatItem.chats.map(chat =>
                    chat.sender === currentUser.username ? renderMessageType1(chat) : renderMessageType2(chat))
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