import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import authReducer from './store/reducers/auth'
// import spendingListsReducer from './store/reducers/spending-lists'
// import budgetCalculatorReducer from './store/reducers/budget-calculator'
import reportWebVitals from './reportWebVitals';

const rootReducer = combineReducers({auth:authReducer
  // ,list:spendingListsReducer,budgetCal:budgetCalculatorReducer
})
const composeEnhancers =process.env.NODE_ENV=== 'development' ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter 
    basename='/social-media/'
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
