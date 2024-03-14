import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: []
}

const cartSlice = createSlice({
    name: "cartslice",
    initialState,
    reducers:{
       addToCart:(state={initialState},action)=>{
        const itemindex= state.carts.findIndex((item)=>item.id===action.payload.id)
         if(itemindex >= 0){
           state.carts[itemindex].qnty +=1
         }else{
          const temp = {...action.payload, qnty:1}
          state.carts = [...state.carts, temp]
         }
        
         
       },
        // remove perticular iteams

        removeToCart:(state,action)=>{
          const data= state.carts.filter((ele)=>ele.id !== action.payload)
          state.carts = data
        },

        removeSingleIteams:(state,action)=>{
          const IteamIndex_dec = state.carts.findIndex((iteam) => iteam.id === action.payload.id);

            if(state.carts[IteamIndex_dec].qnty >=1){
                state.carts[IteamIndex_dec].qnty -= 1
            }

            
        },
        emptyCartItem :(state)=>{
          state.carts = []
        }
    }
})

export const {addToCart, removeToCart, removeSingleIteams,emptyCartItem} = cartSlice.actions;
export default cartSlice.reducer;