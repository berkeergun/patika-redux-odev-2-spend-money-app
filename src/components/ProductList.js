import React from "react";
import ProductCard from "./ProductCard";
import Receipt from "./Receipt";
import { SimpleGrid } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function ProductList() {
  const items = useSelector((state) => state.products.items);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SimpleGrid columns={[2, null, 3]} spacing="10px">
        {items.map((item) => (
          <ProductCard key={item.id} id={item.id} />
        ))}
      </SimpleGrid>

      <Receipt />
    </div>
  );
}

export default ProductList;
