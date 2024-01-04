import { createSlice } from "@reduxjs/toolkit"

type stateType = {
    isAuth : boolean
}
const initialState : stateType = {
    isAuth: false,
}

const PageSlice = createSlice({
    name : "PageSlice",
    initialState,
    reducers : {
        toggleisAuth : (state) => {
            state.isAuth = !state.isAuth
        }
    }
})

export const {toggleisAuth} = PageSlice.actions
export default PageSlice.reducer