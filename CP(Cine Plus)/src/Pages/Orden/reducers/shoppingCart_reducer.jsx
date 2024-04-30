/*funcion reducer */
import TYPES from "./actionTypes";

export const productsInitialState = {
  products: [
    {
      "id": 1,
      "name": "product 1",
      "price": 50
    },
    {
      "id": 2,
      "name": "product 2",
      "price": 30
    },
    {
      "id": 3,
      "name": "product 3",
      "price": 40
    },
    {
      "id": 4,
      "name": "product 4",
      "price": 78
    },
    {
      "id": 5,
      "name": "product 5",
      "price": 90
    },
    {
      "id": 6,
      "name": "product 6",
      "price": 60
    }
  ],
  cart: [],
  totalPriceShoppingCart: 0
}
/*Esta funcion tomas las acciones de compra */
export const reducerCart = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
        /*Esta funcion añade un producto al carro */
      let newProduct = state.products.find((product) => product.id === action.payload)
      return {
        ...state,
        cart: [...state.cart, newProduct]
      };
    }
    case TYPES.DELETE_PRODUCT_FROM_CART: {
      /*Esta funcion elimina un producto del carro */
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload)
      }
    }

    case TYPES.DELETE_ALL_FROM_CART: {
      /*Esta funcion elimina todos los productos del carro */
      return productsInitialState;
    }

    case TYPES.CALCULATE_TOTAL_PRICE_OF_THE_CART: {
      /*Esta funcion calcula el precio total del carro */
      return {
        ...state,
        totalPriceShoppingCart: state.cart.reduce((previousValue, product) => previousValue + product.price, 0)
      }
    }
    default:
      return state;
  }

    throw Error("Unknown action: " + action.type);
}