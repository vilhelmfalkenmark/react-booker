import {createStore, combineReducers, compose} from 'redux'
import {reduxReactFirebase, firebaseStateReducer} from 'redux-react-firebase'

const rootReducer = combineReducers({
  firebase: firebaseStateReducer
})
const config = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket>'
}
const createStoreWithFirebase = compose(
    reduxReactFirebase(config),
)(createStore)


store = createStoreWithFirebase(rootReducer, initialState)
