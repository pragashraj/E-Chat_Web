import React from 'react'

import Picker, { SKIN_TONE_LIGHT } from 'emoji-picker-react'

const EmojiPicker = ({handleEmojiOnSelect, desktopView}) => {
    const width = !desktopView && "200px"
    return (
        <Picker
            onEmojiClick={(e, emojiObject) => handleEmojiOnSelect(e, emojiObject)}
            disableAutoFocus = {true}
            skinTone = {SKIN_TONE_LIGHT}
            groupNames = {{ smileys_people: "PEOPLE" }}
            native
            pickerStyle = {{ width: width }}
        />
    )
}

export default EmojiPicker
