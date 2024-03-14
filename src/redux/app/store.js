import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../feature/cartSlice';

const store = configureStore({
    reducer:{
        allcart:cartSlice
    }
})

export default store;