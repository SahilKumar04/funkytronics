import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';
import {cartSlice} from "./cartSlice";


const rootReducer = combineReducers({
  [cartSlice.name]:cartSlice.reducer,
})


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);



const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware:[thunk]
    
  });

export const wrapper = createWrapper(makeStore);

export const store = makeStore();