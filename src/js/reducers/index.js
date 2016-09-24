import { createStore, combineReducers , compose} from 'redux';
import {reduxReactFirebase, firebaseStateReducer} from 'redux-react-firebase'


import test from './test';


const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  test
})

if(location.host.indexOf("localhost") != -1){
// DEV
var config = {
  apiKey: "AIzaSyAo-ZnaPl7PrGDCvwQROxzZr5ffTNeQwbY",
  authDomain: "react-laundry-booker.firebaseapp.com",
  databaseURL: "https://react-laundry-booker.firebaseio.com",
  storageBucket: "react-laundry-booker.appspot.com",
};
} else {
 // PROD
 var config = {
   apiKey: "AIzaSyAgIocH5tanjTlTjJBXv8s2VBE61sn3Bzk",
   authDomain: "tvattstuge-bokaren.firebaseapp.com",
   databaseURL: "https://tvattstuge-bokaren.firebaseio.com",
   storageBucket: "tvattstuge-bokaren.appspot.com",
   messagingSenderId: "341927506280"
 };
}

const createStoreWithFirebase = compose(
    reduxReactFirebase(config),
)(createStore)



const store = createStoreWithFirebase(rootReducer)



export default store;
