import React from 'react'

import Home from './screens/Home/Home'
import SignIn from './screens/SignIn/SignIn'

const App = () => {
    const auth = true
    return (
        <div className = "App">
            { auth ? <Home/> : <SignIn/> }
        </div>
    )
}

export default App
