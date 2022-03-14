import Head from "next/head";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

const ProductsPage = () => {
  const [productList, setProductList] = useState([]);
  const authSelector = useSelector((state) => state.auth);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:2000/products");

      setProductList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderProducts = () => {
    return productList.map((product) => {
      return (
        <div>
          {product.product_name}
          <ul>
            <li>id: {product.id}</li>
            <li>price: {product.price}</li>
          </ul>
        </div>
      );
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box padding="10">
      <Head>
        <title>My Products Page</title>
      </Head>
      <h1>Products Page</h1>
      {/* <h1>{authSelector.id}</h1> */}

      {renderProducts()}
    </Box>
  );
};

export default ProductsPage;
