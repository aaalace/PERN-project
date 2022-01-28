import {createStore} from 'redux'
import {combineReducers} from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
import {todosReduser} from './TodosReducer'
import { modalReduser } from './ModalReduser'

const rootReducer = combineReducers({
    todos: todosReduser,
    modal: modalReduser
})

const store = createStore(
    rootReducer,
)

export default store
