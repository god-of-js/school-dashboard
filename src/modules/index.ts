import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {}
})

export default function getStore() {
    return store;
  }