import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  onSnapshot,
  collection,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATCaq_MLda90SybU-ThRGz-mG2zjwtjLc",
  authDomain: "brainwave-a600a.firebaseapp.com",
  projectId: "brainwave-a600a",
  storageBucket: "brainwave-a600a.appspot.com",
  messagingSenderId: "752706525802",
  appId: "1:752706525802:web:cd6fb334d1a6b526334813",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { dispatch }) => {
    const latestQuery = query(collection(db, "products"));
    onSnapshot(latestQuery, (snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setProducts(products));
    });
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    product: [],
    loading: false,
  },
  reducers: {
    setProducts(state, action) {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state) => {
      state.loading = true;
    });
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
