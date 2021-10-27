import React from 'react'
import {connect} from 'react-redux'

import Home from './screens/Home/Home'
import SignIn from './screens/SignIn/SignIn'

const App = ({authResponse}) => {
    return (
        <div className = "App">
            { authResponse ? <Home/> : <SignIn/> }
        </div>
    )
}


const mapStateToProps = state => ({
    authResponse: state.auth.authResponse,
})

export default connect(mapStateToProps)(App)
