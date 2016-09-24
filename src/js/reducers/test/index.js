import {
 ADD
} from '../../actions/';

const initialState = {
 number : 0
};

export default function test(state = initialState, action) {
 switch (action.type) {
  case ADD:
   return {
    ...state,
    number: state.number + 1
   }
  default:
   return state;
 }
}
