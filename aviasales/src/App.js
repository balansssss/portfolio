import logo from './Logo.png';
import cls from './App.module.css';
import Filter from "./Components/Filter";
import React from "react";
import Tickets from "./Components/Tickets";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./Redux/rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

function App() {
  return (
      <Provider store={store}>
          <React.Fragment>
            <img src={logo} className={cls.logo} alt="Logo"/>
            <div className={cls.container}>
              <Filter />
              <Tickets />
            </div>
          </React.Fragment>
      </Provider>
  );
}

export default App;
