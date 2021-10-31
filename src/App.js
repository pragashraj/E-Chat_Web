import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import routes from './routes/routes'

const App = () => {
    return (
        <div className = "App">
            <BrowserRouter>
                <Switch>
                    { routes.data.map((route,i) => <Route 
                            path = {route.path} 
                            component = {route.component} key = {i}
                            exact = {route.type === "main"}
                        />
                    ) }
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
