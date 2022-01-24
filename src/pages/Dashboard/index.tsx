import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { useEffect } from "react";
import { Grid } from "@chakra-ui/react";
import { useCart } from "../../contexts/CartContext";

export const Dashboard = () => {
  const { obtainProducts, products } = useCart();

  useEffect(() => {
    obtainProducts();
  }, []);

  return (
    <>
      <Header />
      <Grid
        w="100%"
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        paddingX="8"
        mt="8"
      >
        {products.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </Grid>
    </>
  );
};
