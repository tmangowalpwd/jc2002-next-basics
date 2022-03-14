import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

const ProductDetailPage = ({ productData }) => {
  const router = useRouter();

  // console.log(router.query);
  return (
    <div style={{ paddingLeft: "24px" }}>
      <Head>
        <title>
          {productData.product_name} || Rp. {productData.price}
        </title>
      </Head>
      <h1>Product Details Page: {router.query.productId}</h1>
      <ul>
        <li>{productData.id}</li>
        <li>{productData.product_name}</li>
        <li>{productData.price}</li>
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:2000/products/1");

  return {
    props: {
      productData: res.data,
    },
  };
}

export default ProductDetailPage;
