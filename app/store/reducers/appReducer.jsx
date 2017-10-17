import actionTypes from '../actions/actionTypes';
import stateTree from '../stateTree';

export default function appReducer(state = stateTree, action) {
    switch(action.type) {
		case actionTypes.THEME_SAVED:
			return { ...state, theme: action.theme };
        default:
            return state;
    }
}