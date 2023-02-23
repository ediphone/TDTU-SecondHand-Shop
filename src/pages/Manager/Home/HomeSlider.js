import { createSlice } from "@reduxjs/toolkit";

export const HomeSlide = createSlice({
    name: 'home',
    initialState:{
        currentUser: {},
        messages: [],
        contact: []
    },
    reducers:{
        addUser: (state, action) => {
            state.currentUser = action.payload
        },
        changeMessage: (state, action) => {
            state.messages = action.payload
        },
        contactList: (state, action) => {
            state.contact = action.payload
        }
    }
})