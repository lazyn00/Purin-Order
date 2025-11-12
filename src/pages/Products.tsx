// @/pages/Products.tsx

import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { productsData } from "@/data/products";
import { ProductCard } from "@/components/ProductCard"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, ArrowUpDown } from "lucide-react";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedArtist, setSelectedArtist] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  const artists = ["all", ...Array.from(new Set(productsData.map(p => p.artist)))];

  // Filter (giữ nguyên)
  let filteredProducts = productsData.filter(product => {
    const categoryMatch = selectedCategory === "all" || product.category === "all" || product.category === selectedCategory;
    const artistMatch = selectedArtist === "all" || product.artist === selectedArtist;
    return categoryMatch && artistMatch;
  });

  // Sort (giữ nguyên)
  if (sortBy === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          {/* ... (Tiêu đề giữ nguyên) ... */}
          <h1 className="text-4xl font-bold mb-4">Sản phẩm Pre-order</h1>
          <p className="text-muted-foreground">
            Order sản phẩm K-pop, C-pop, Anime từ Taobao, PDD, Douyin, XHS, 1688
          </p>
        </div>

        {/* Filters and Sort (Giữ nguyên) */}
        <div className="mb-8 space-y-4">
           {/* ... (Toàn bộ phần filter giữ nguyên) ... */}
        </div>

        {/* === (SỬA ĐỔI) LAYOUT RESPONSIVE "DÀY ĐẶC" === */}
        {/* Mobile: 2, Tablet-SM: 3, Tablet-MD: 4, LG: 5, XL: 6 cột */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
        {/* === KẾT THÚC SỬA ĐỔI === */}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Không tìm thấy sản phẩm nào</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
