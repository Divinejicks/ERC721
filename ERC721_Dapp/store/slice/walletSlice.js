import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nft: {},
    marketplace: {},
    myaddress: ''
}

const walletSlice = createSlice({
    name: "walletPlug",
    initialState,
    reducers: {
        setNFTPlug(state, action){
            state.nft = action.payload
        },

        setMarketPlacePlug(state, action) {
            state.marketplace = action.payload
        },

        setMyAddress(state, action) {
            state.myaddress = action.payload
        }
    }
})

export const { setNFTPlug, setMarketPlacePlug, setMyAddress } = walletSlice.actions;
export default walletSlice.reducer
