import { useRouter } from "next/router";

const ProductDetailPage = () => {
  const router = useRouter();

  // console.log(router.query);

  return (
    <div>
      <h1>Product Details Page: {router.query.productId}</h1>
    </div>
  );
};

export default ProductDetailPage;
