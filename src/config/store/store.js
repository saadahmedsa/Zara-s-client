const { configureStore } = require("@reduxjs/toolkit");
import authReducer from "./auth-slice"
import adminProductsSlice from "./admin/products-slice/index"
import shopProductsSlice from "./shop/product-slice/index"
import shopCartSlice from "./shop/cart-slice/index"
import shopAddressSlice from "./shop/addrees-slice/index.js"
import commonfeatureslice from "./common-slice/index"



const store = configureStore({
    reducer : {
        auth : authReducer,
        adminproduct : adminProductsSlice,
        shopProducts : shopProductsSlice,
        cartItems  : shopCartSlice,
        shopAddress : shopAddressSlice,
        commonSlice : commonfeatureslice
    }
    
})
export default store