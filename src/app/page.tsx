import Hero from "../components/Hero";
import { getProducts } from "../lib/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <Hero></Hero>
      <h1>BazarDor</h1>

      <pre>
        {JSON.stringify(products, null, 2)}
      </pre>
    </main>
  );
}