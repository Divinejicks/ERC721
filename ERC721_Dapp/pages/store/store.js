import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./slice/walletSlice"


const store = configureStore({
    reducer: {
        walletPlug: walletReducer,
    },
    middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
})

export default store