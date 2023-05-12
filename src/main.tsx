import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  form: formReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
