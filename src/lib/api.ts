import type { Product } from "../types/product";

const BASE_URL =
  "https://api.api-store.workers.dev/api/bazardor";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const products = await getProducts();

  return products.find((product) => product.slug === slug) ?? null;
}