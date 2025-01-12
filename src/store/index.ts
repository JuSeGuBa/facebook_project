import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usa localStorage por defecto
import { combineReducers } from "redux";
import postReducer from "./reducers/postSlice";

const persistConfig = {
  key: "root", // Clave para identificar los datos persistentes
  storage, // Almacenamiento en localStorage
};

// Combina tus reducers (como postsReducer) aquí
const rootReducer = combineReducers({
  posts: postReducer,
});

// Envuelve al rootReducer para añadir la lógica de persistencia
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Tipos para el estado y el dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
