import {combineReducers} from 'redux'
import loginReducer from './loginReducer'

import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    auth: loginReducer
})


export default persistReducer(persistConfig, rootReducer)