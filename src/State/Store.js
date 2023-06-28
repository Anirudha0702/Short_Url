import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {urlSlice} from "./urlSlice"

const globalStore = () =>
  configureStore({
    reducer: {
      [urlSlice.name]:urlSlice.reducer
    },
    devTools: true,
  });

export const wrapper = createWrapper(globalStore);