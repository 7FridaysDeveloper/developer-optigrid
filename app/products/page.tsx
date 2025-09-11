import Products from "@/components/Products";

export default function ProductsPage() {
  return (
    <article className="container mx-auto px-4 py-12">
      <h1 className="sr-only">Our Products</h1>
      <Products />
    </article>
  );
}
