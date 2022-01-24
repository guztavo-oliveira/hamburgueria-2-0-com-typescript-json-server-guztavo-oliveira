import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useCart } from "../../contexts/CartContext";

import { ModalCartProducts } from "../Modal/ModalCartProducts";

interface ModalCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalCart = ({ isOpen, onClose }: ModalCartProps) => {
  const {
    obtainProductsInCart,
    productsInCart,
    totalCart,
    deleteAllProductsInCart,
  } = useCart();

  useEffect(() => {
    obtainProductsInCart();
  }, []);

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="primary" color="white">
          Carrinho de compras
        </ModalHeader>
        <ModalCloseButton color="white" mt="2" />

        <ModalBody pb={6}>
          {productsInCart.length !== 0 ? (
            <>
              {productsInCart.map((productsInCart, i) => (
                <ModalCartProducts product={productsInCart} key={i} />
              ))}
              <Box w="100%" h="2px" bg="gray.100" mt="4" mb="4" />
              <Flex justify="space-between">
                <Text>Total </Text>
                <Text>R$ {totalCart.toFixed(2).replace(".", ",")}</Text>
              </Flex>
              <Button
                h="60px"
                w="100%"
                mt="4"
                bg="gray.100"
                _hover={{ bg: "gray.300", color: "white" }}
                color="gray.300"
                onClick={() => deleteAllProductsInCart()}
              >
                Remover todos
              </Button>
            </>
          ) : (
            <Text>Carrinho vazio</Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
