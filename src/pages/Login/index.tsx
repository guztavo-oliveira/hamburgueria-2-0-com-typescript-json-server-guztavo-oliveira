import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { RiShoppingBag3Line } from "react-icons/ri";

import { Input } from "../../components/Form/input";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface SignInData {
  email: string;
  password: string;
  // name: string | null;
}

export const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória"),
  });
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignInData>({
    resolver: yupResolver(schema),
  });

  const { SignIn } = useAuth();

  const handleSignIn = (data: SignInData) => {
    SignIn(data);
  };

  const history = useHistory();

  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justify="center"
      gap={["0px", "0px", "60px"]}
      flexDir={["column-reverse", "column-reverse", "row", "row"]}
    >
      <Grid
        onSubmit={handleSubmit(handleSignIn)}
        as="form"
        border="2px solid"
        borderColor="gray.0"
        p="30px"
        bg="white"
        borderRadius="5px"
        maxW="500px"
        w={["auto", "auto", "500px"]}
      >
        <Heading size="md">Login </Heading>
        <VStack spacing="4" mt="4">
          <Input
            placeholder="E-mail"
            error={errors.email}
            {...register("email")}
          />

          <Input
            placeholder="Senha"
            error={errors.password}
            {...register("password")}
            type="password"
          />
        </VStack>
        <Button
          bg="primary"
          w="100%"
          h="60px"
          mt="4"
          _hover={{ bg: "green_hover" }}
          type="submit"
        >
          Logar
        </Button>
        <Text mt="4" align="center">
          Crie sua conta para saborear muitas delícias{" "}
          <Text>e matar sua fome!</Text>
        </Text>
        <Button
          bg="gray.100"
          mt="4"
          w="100%"
          h="60px"
          _hover={{ bg: "gray.300" }}
          onClick={() => history.push("/signup")}
        >
          Cadastrar
        </Button>
      </Grid>
      <Box
        maxW="377px"
        // w={["auto', 'auto', 377px"]}
        // h={["210px", "210px", "377px"]}
      >
        <Box mt="5">
          <Text
            display="inline-block"
            fontSize="32px"
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
            fontSize="20px"
          >
            Kenzie
          </Text>
        </Box>
        <Flex
          p="20px"
          mt="4"
          alignItems="center"
          w="100%"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="5px"
          color="gray.300"
          boxShadow="0px 4px 40px -20px rgba(0, 0, 0, 0.25)"
        >
          <Center
            w="60px"
            h="60px"
            bg="rgba(39, 174, 96, 0.1)"
            borderRadius="5px"
            mr="3"
            color="primary"
          >
            <RiShoppingBag3Line fontSize="30px" />
          </Center>
          <Box w="80%">
            <Text>
              A vida é como um sanduíche, é preciso recheá-la com os melhores
              ingredientes.
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
