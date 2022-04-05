import { createSlice } from "@reduxjs/toolkit";
import data from "./items.json";

const allProducts = data.items;
const navMoney = data.navMoney
const receiptMoney = data.receiptMoney
export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: allProducts,
    navMoney: navMoney,
    receiptMoney: receiptMoney,
  },
  reducers: {
    updateAmount: (state, action) => {
      const { id, amount } = action.payload;
      const item = state.items.find((e) => e.id === id);
      item.amount = amount;
      let price = 0;

      // eslint-disable-next-line array-callback-return
      state.items.map((e) => {
        price += Number(e.amount) * Number(e.price);
      });
      state.navMoney = Number(state.receiptMoney) - Number(price);
    },
  },
});

export const { updateAmount } = productsSlice.actions;

export default productsSlice.reducer;
