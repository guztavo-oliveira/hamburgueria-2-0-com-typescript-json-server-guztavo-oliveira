import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";

interface ModalCartProductsProps {
  product: NewProduct;
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

export const ModalCartProducts = ({ product }: ModalCartProductsProps) => {
  const { addProductUnInCart, subProductUnInCart, deleteProductInCart } =
    useCart();

  return (
    <>
      <Flex mb="4">
        <Box w="100px" h="100px" bg="gray.100" mr="4">
          <Image src={product.img} />
        </Box>
        <Flex flex="1">
          <Flex flexDir="column" justify="space-between" flex="1">
            <Flex justify="space-between" alignItems="center" w="100%">
              <Text>{product.name}</Text>
              <FaTrash
                onClick={() => deleteProductInCart(product)}
                cursor="pointer"
              />
            </Flex>
            <Flex w="100%">
              <Center
                as="button"
                w="30px"
                h="30px"
                bg="gray.100"
                cursor="pointer"
                onClick={() => {
                  if (product.qtd === 1) {
                    deleteProductInCart(product);
                  } else {
                    subProductUnInCart(product);
                  }
                }}
              >
                -
              </Center>
              <Center
                borderTop="1px solid"
                borderTopColor="gray.100"
                borderBottom="1px solid"
                borderBottomColor="gray.100"
                w="30px"
              >
                {product.qtd}
              </Center>
              <Center
                as="button"
                w="30px"
                h="30px"
                bg="gray.100"
                cursor="pointer"
                onClick={() => addProductUnInCart(product)}
              >
                +
              </Center>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
