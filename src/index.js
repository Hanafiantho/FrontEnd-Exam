import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

// Add CSS From BootStrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Import Parent Component
import App from './components/App'

//Import Reducers
import reducers from './reducers'

const reduxStore = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={reduxStore}>
        <App/>
    </Provider>,document.getElementById('root')
)