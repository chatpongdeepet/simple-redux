import { configureStore } from "@reduxjs/toolkit";
import {rootReducer} from "./AppState";

const store = configureStore({
  reducer: rootReducer, // ใช้ rootReducer ของคุณ
  preloadedState: {},   // คุณสามารถกำหนดค่าเริ่มต้นให้ state ได้ที่นี่ (optional)
});

export default store;