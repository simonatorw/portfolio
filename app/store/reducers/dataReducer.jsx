import actionTypes from '../actions/actionTypes';
import stateTree from '../stateTree';

export default function dataReducer(state = stateTree, action) {
    switch(action.type) {
	    case actionTypes.PORTFOLIO_DATA.SUCCEEDED:
			//console.log(action.data);
			return { ...state, portfolio: action.data };
        default:
            return state;
    }
}