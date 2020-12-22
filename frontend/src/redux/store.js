import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//// Reducers
import { productListsReducer } from "./reducers/productLists";
import { productDetailsReducer } from "./reducers/productDetails";
import { cartReducer } from "./reducers/cart";

const reducer = combineReducers({
  productList: productListsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

// GET all cart Items from local Storage

const cartsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: { cartItems: cartsFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
