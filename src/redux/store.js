import { configureStore } from "@reduxjs/toolkit";
import { HomeSlide } from "~/pages/Home/HomeSlider";

export const store = configureStore({
  reducer: {
    home: HomeSlide.reducer,
  },
});
