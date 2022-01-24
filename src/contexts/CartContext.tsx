import { AxiosResponse } from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import api from "../services/api";
import { useAuth } from "./AuthContext";

import toast from "react-hot-toast";

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextData {
  addProduct: (product: Product) => void;
  subProductUnInStock: (product: NewProduct) => void;
  addProductUnInStock: (product: NewProduct) => void;
  subProductUnInCart: (product: NewProduct) => void;
  addProductUnInCart: (product: NewProduct) => void;
  deleteProductInCart: (product: NewProduct) => void;
  deleteAllProductsInCart: () => void;
  obtainProducts: () => void;
  products: Product[];
  setProducts: (product: Product[]) => void;
  obtainProductsInCart: () => void;
  productsInCart: NewProduct[];
  totalCart: number;
}

interface Product {
  category: string;
  id: number;
  img: string;
  name: string;
  price: number;
  qtd: number;
}

interface NewProduct {
  category: string;
  id: number;
  img: string;
  name: string;
  price: number;
  qtd: number;
  userId?: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsInCart, setProductsInCart] = useState<NewProduct[]>([]);
  const [totalCart, setTotalCart] = useState(0);
  const { accessToken, user } = useAuth();
  console.log("productsInCart", productsInCart);
  console.log("totalCart", totalCart);

  useEffect(() => {
    setTotalCart(
      productsInCart.reduce((acc, curr) => acc + curr.qtd * curr.price, 0)
    );
  }, [productsInCart]);

  const obtainProducts = () => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.log(err));
  };

  const obtainProductsInCart = () => {
    api
      .get("/cart", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setProductsInCart(response.data);

        console.log("obtainProductsInCart", response.data);
      })
      .catch((err) => console.log(err));
  };

  const addProduct = (product: NewProduct) => {
    api
      .post(
        "/cart",
        {
          ...product,
          userId: user.id,
          qtd: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: AxiosResponse<NewProduct>) => {
        subProductUnInStock(product);
        obtainProducts();
        obtainProductsInCart();
        toast.success("Produto adicionado ao carrinho com sucesso!");

        console.log(response.data);
      })
      .catch((err) => {
        toast.error("Já adicionado ao carrinho!");
      });
  };

  const subProductUnInStock = (product: NewProduct) => {
    const { id } = product;

    api
      .get(`products/${id}`)
      .then((response) => {
        const { id, qtd } = response.data;
        api
          .patch(
            `/products/${id}`,
            { qtd: qtd - 1 },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            console.log("subProductUnInStock - resposta.data", response.data);
            obtainProducts();
            obtainProductsInCart();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    console.log("subProductUnInStock", product, id);
  };

  const subProductUnInCart = (product: NewProduct) => {
    const { id, qtd } = product;
    api
      .patch(
        `/cart/${id}`,
        { qtd: qtd - 1 },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        addProductUnInStock(product);
        obtainProductsInCart();
      })
      .catch((err) => console.log(err));
  };

  const addProductUnInStock = (product: NewProduct) => {
    const { id } = product;
    api
      .get(`products/${id}`)
      .then((response) => {
        const { id, qtd } = response.data;
        api
          .patch(
            `/products/${id}`,
            { qtd: qtd + 1 },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            obtainProductsInCart();
            obtainProducts();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const addProductUnInCart = (product: NewProduct) => {
    const { id, qtd } = product;
    api
      .patch(
        `/cart/${id}`,
        { qtd: qtd + 1 },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        subProductUnInStock(product);
        obtainProductsInCart();
      })
      .catch((err) => console.log(err));
  };

  const deleteProductInCart = ({ id }: NewProduct) => {
    api
      .delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        obtainProductsInCart();
      })
      .catch((err) => console.log(err));
  };

  const deleteAllProductsInCart = () => {
    productsInCart.map((e) => {
      return api
        .delete(`/cart/${e.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          obtainProductsInCart();
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <CartContext.Provider
      value={{
        addProduct,
        addProductUnInStock,
        subProductUnInStock,
        addProductUnInCart,
        subProductUnInCart,
        deleteProductInCart,
        obtainProducts,
        deleteAllProductsInCart,
        products,
        setProducts,
        obtainProductsInCart,
        productsInCart,
        totalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
