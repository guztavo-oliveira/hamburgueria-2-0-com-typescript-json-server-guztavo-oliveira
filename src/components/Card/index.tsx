import { Box, Button, Center, Flex, Image, Text } from "@chakra-ui/react";
import { useCart } from "../../contexts/CartContext";

interface CardProps {
  product: Product;
}

interface Product {
  category: string;
  id: number;
  img: string;
  name: string;
  price: number;
  qtd: number;
}

export const Card = ({ product }: CardProps) => {
  const { addProduct } = useCart();

  return (
    <Box
      w="300px"
      h="340px"
      border="2px solid"
      borderColor="gray.100"
      transition="all 0.5s ease"
      transform="scale(0.9)"
      _hover={{
        borderColor: "primary",
        transform: "scale(1)",
        transition: "all 0.5s ease",
      }}
      borderRadius="6.5px"
      cursor="pointer"
    >
      <Center h="40%" bg="gray.100" borderTopRadius="5px" w="100%">
        <Image src={product.img} objectFit="cover" w="150" h="150" />
      </Center>
      <Flex flexDir="column" gap="20px" mt="4" p="10px 20px">
        <Text>{product.name}</Text>
        <Text>{product.category}</Text>
        <Text>R$ {product.price.toFixed(2).replace(".", ",")}</Text>
        <Button
          bg="primary"
          color="white"
          w="90px"
          onClick={() => addProduct(product)}
        >
          Adicionar
        </Button>
      </Flex>
    </Box>
  );
};
