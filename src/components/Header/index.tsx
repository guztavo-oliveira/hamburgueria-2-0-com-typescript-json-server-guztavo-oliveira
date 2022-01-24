import {
  Box,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { theme } from "../../styles/theme";
import { ModalCart } from "../Modal/ModalCart";

interface Product {
  category: string;
  id: number;
  img: string;
  name: string;
  price: number;
  qtd: number;
}

export const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { obtainProductsInCart, setProducts, products, obtainProducts } =
    useCart();

  const { LogOut } = useAuth();

  const handleSearch = (ele: any) => {
    if (!ele.currentTarget.value) {
      obtainProducts();
    } else {
      setProducts(
        products.filter(
          (e) =>
            e.name.includes(ele.target.value) ||
            e.category.includes(ele.target.value)
        )
      );
    }
  };
  return (
    <>
      <ModalCart isOpen={isOpen} onClose={onClose} />
      <Flex
        bg="gray.0"
        h="80px"
        w="100%"
        p="0px 20px"
        justify="space-between"
        alignItems="center"
      >
        <Box>
          <Text
            display="inline-block"
            fontSize="28px"
            fontWeight="700"
            color="black"
          >
            Burguer
          </Text>
          <Text
            ml="2"
            display="inline-block"
            color="secundary"
            fontWeight="bold"
            fontSize="18px"
          >
            Kenzie
          </Text>
        </Box>
        <Flex justify="space-evenly" alignItems="center" w="45%">
          <InputGroup w="60%" display={["none", "initial", "initial"]}>
            <InputRightElement
              pointerEvents="none"
              children={
                <Center
                  bg="primary"
                  w="30px"
                  h="30px"
                  color="white"
                  borderRadius="5px"
                >
                  <FiSearch size={25} />
                </Center>
              }
            />
            <Input
              placeholder="Pesquise seu lanche"
              bg="white"
              onChangeCapture={handleSearch}
            />
          </InputGroup>
          <Box display={["initial", "none", "none"]}>
            <FiSearch color={theme.colors.gray[300]} size={25} />
          </Box>
          <FaShoppingCart
            color={theme.colors.gray[300]}
            size={25}
            onClick={() => {
              onOpen();
              obtainProductsInCart();
            }}
            cursor="pointer"
          />
          <FiLogOut
            color={theme.colors.gray[300]}
            size={25}
            cursor="pointer"
            onClick={LogOut}
          />
        </Flex>
      </Flex>
    </>
  );
};
