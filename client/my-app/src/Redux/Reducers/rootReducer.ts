import { combineReducers } from 'redux';
import studentReducer from './studentReducer';
const rootReducer = combineReducers({
    students: studentReducer
});
export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
