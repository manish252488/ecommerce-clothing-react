import * as reduxModule from "redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import createReducer from "./rootReducer";
/*
Fix for Firefox redux dev tools extension
https://github.com/zalmoxisus/redux-devtools-instrument/pull/19#issuecomment-400637274
 */
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = "@@redux/INIT";

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const loadLocalStorage = () => {
  try {
    let serializedState = localStorage.getItem("state");
    if (serializedState !== null) {
      return JSON.parse(serializedState);
    } else {
      return {};
    }
  } catch (e) {
    console.log("error fetching state", e);
    return {};
  }
};

const persistedState = loadLocalStorage();
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(createReducer(), persistedState, enhancer);

store.subscribe(() => saveToLocalStorage(store.getState()));

store.asyncReducers = {};

export const saveToLocalStorage = (state) => {
  try {
    let serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log("error saving state", e);
  }
};

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return false;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export default store;
