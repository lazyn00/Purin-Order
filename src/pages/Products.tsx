import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// (Xóa 'productsData', import 'useCart')
import { useCart } from "@/contexts/CartContext"; 
import { ProductCard } from "@/components/ProductCard"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, ArrowUpDown, Loader2 } from "lucide-react"; // Thêm Loader2

export default function Products() {
  // === (SỬA ĐỔI) Đọc sản phẩm từ context ===
  const { products, isLoading } = useCart();
  // === KẾT THÚC SỬA ĐỔI ===
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedArtist, setSelectedArtist] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  // (Sửa lại: đọc artist từ state 'products' động)
  const artists = ["all", ...Array.from(new Set(products.map(p => p.artist)))];

  // Filter products
  let filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    const artistMatch = selectedArtist === "all" || product.artist === selectedArtist;
    return categoryMatch && artistMatch;
  });

  // Sort products
  if (sortBy === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }

  // === (THÊM MỚI) Xử lý loading ===
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex justify-center items-center h-[50vh]">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      </Layout>
    );
  }
  // === KẾT THÚC THÊM MỚI ===

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Sản phẩm Pre-order</h1>
          <p className="text-muted-foreground">
            Order sản phẩm K-pop, C-pop, Anime từ Taobao, PDD, Douyin, XHS, 1688
          </p>
        </div>

        {/* (Phần filter giữ nguyên) */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4">
            {/* ... (filter code) ... */}
          </div>
        </div>

        {/* (Layout "Shopee" giữ nguyên) */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Không tìm thấy sản phẩm nào</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
