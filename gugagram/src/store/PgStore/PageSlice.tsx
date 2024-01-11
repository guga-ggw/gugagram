import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentAccount } from "@/lib/appwrite/api";
import { IUser } from "@/types";

type stateType = {
    isAuth: boolean;
    User: any;
};

const initialState: stateType = {
    isAuth: false,
    User: {
        bio: "",
        email: "",
        id: "",
        imageUrl: "",
        name: "",
        username: "",
    },
};

export const fetchCurrentAccount = createAsyncThunk(
    "PageSlice/fetchCurrentAccount",
    async () => {
        const user = await getCurrentAccount();
        console.log(user)
        return user;
    }
);

const PageSlice = createSlice({
    name: "PageSlice",
    initialState,
    reducers: {
        toggleIsAuth: (state) => {
            state.isAuth = !state.isAuth
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentAccount.fulfilled, (state, action) => {
            state.User = action.payload
        });
    },
});

export const { toggleIsAuth } = PageSlice.actions;

export default PageSlice.reducer;