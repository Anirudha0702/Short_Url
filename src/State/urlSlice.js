import { createSlice } from "@reduxjs/toolkit"
const initialState={
    all_urls:[],
}


export const urlSlice=createSlice({
    name:'urls',
    initialState,
    reducers:{
        setSlice:(state,action)=>{
            state.all_urls=action.payload
        },
        addUrl:(state,action)=>{
            state.all_urls=[...state.all_urls,action.payload];
        },
        deleteUrl:(state,action)=>{
            state.all_urls=[...state.all_urls.slice(0,action.payload),...state.all_urls.slice(action.payload+1)]
        },
        getDefault:(state,action)=>{
            state.all_urls=state.all_urls
        },
    },
});
export const {deleteUrl,addUrl,setSlice,getDefault}=urlSlice.actions;
export const urls=(state)=>state.urls.all_urls;
export default urlSlice.reducer;