
import { getProducts } from "../lib/api";
import Hero from "../components/Hero";
import ProductSections from "../components/ProductSection";

export default async function Home() {
  const products = await getProducts();

  return (
    <>

      <main>
        <Hero></Hero>

        <ProductSections products={products} />
      </main>
    </>
  );
}