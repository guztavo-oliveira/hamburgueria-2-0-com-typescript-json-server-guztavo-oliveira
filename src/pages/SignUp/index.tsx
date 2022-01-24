import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Input } from "../../components/Form/input";

import { RiShoppingBag3Line } from "react-icons/ri";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../contexts/AuthContext";

interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export const SignUp = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória"),
    confirmPassword: yup
      .string()
      .required("Senha obrigatória")
      .oneOf([yup.ref("password")], "Senhas diferentes"),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpData>({
    resolver: yupResolver(schema),
  });

  const { SignUp } = useAuth();

  const handleSignUp = ({ name, email, password }: SignUpData) => {
    console.log(name, email, password);
    const user = {
      name,
      email,
      password,
    };
    SignUp(user);
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
      <Box
        maxW="377px"
        // w={["auto', 'auto', 377px"]}
        // h={["210px", "210px", "377px"]}
        display={["none", "none", "initial"]}
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
      <Box
        as="form"
        border="2px solid"
        borderColor="gray.0"
        p="30px"
        bg="white"
        borderRadius="5px"
        maxW="500px"
        w={["auto", "auto", "500px"]}
        onSubmit={handleSubmit(handleSignUp)}
      >
        <Flex justify="space-between">
          <Heading size="md">Cadastro </Heading>
          <Text as="button" cursor="pointer" onClick={() => history.push("/")}>
            Retornar para o login
          </Text>
        </Flex>
        <VStack spacing="4" mt="4">
          <Input placeholder="Nome" {...register("name")} error={errors.name} />
          <Input
            placeholder="E-mail"
            {...register("email")}
            error={errors.email}
          />
          <Input
            placeholder="Senha"
            {...register("password")}
            error={errors.password}
          />
          <Input
            placeholder="Confirmar Senha"
            {...register("confirmPassword")}
            error={errors.confirmPassword}
          />
        </VStack>
        <Button
          bg="gray.100"
          mt="4"
          w="100%"
          h="60px"
          _hover={{ bg: "gray.300" }}
          type="submit"
        >
          Cadastrar
        </Button>
      </Box>
    </Flex>
  );
};
