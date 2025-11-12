// @/components/ProductCard.tsx

import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// (Bạn có thể cần import kiểu Product từ data/context)
type ProductVariant = {
  name: string;
  price: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  status?: string;
  variants: ProductVariant[];
};

// === (HÀM HELPER ĐỒNG BỘ "K") ===
const formatPriceK = (price: number) => {
  const priceInK = Math.round(price / 1000);
  return `${priceInK}k`;
};

const getPriceRange = (variants: ProductVariant[], defaultPrice: number): string => {
  if (!variants || variants.length === 0) {
    return formatPriceK(defaultPrice);
  }
  if (variants.length === 1) {
    return formatPriceK(variants[0].price);
  }

  let minPrice = variants[0].price;
  let maxPrice = variants[0].price;
  for (const variant of variants) {
    if (variant.price < minPrice) minPrice = variant.price;
    if (variant.price > maxPrice) maxPrice = variant.price;
  }

  const minK = Math.round(minPrice / 1000);
  const maxK = Math.round(maxPrice / 1000);

  if (minK === maxK) {
    return `${minK}k`;
  }

  return `${minK}k - ${maxK}k`;
};
// === KẾT THÚC HÀM HELPER ===


export function ProductCard({ product }: { product: Product }) {
  const thumbnail = product.images[0] || "https://i.imgur.com/placeholder.png";
  
  const priceDisplay = getPriceRange(product.variants, product.price);

  return (
    <Link to={`/product/${product.id}`} className="group block">
      {/* (Layout "Shopee") */}
      <div className="overflow-hidden rounded-sm bg-card shadow-sm transition-shadow hover:shadow-md">
        
        <div className="relative aspect-square overflow-hidden">
          <img
            src={thumbnail}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.status && (
            <Badge 
              variant="secondary" 
              className="absolute top-1.5 left-1.5 h-5 px-1.5 text-[10px]"
            >
              {product.status}
            </Badge>
          )}
        </div>

        <div className="p-2">
          <h3 className="h-8 text-xs font-normal line-clamp-2 md:text-sm md:h-10">
            {product.name}
          </h3>
          {/* === (SỬA LỖI TYPO) === */}
          <p className="mt-1 truncate text-sm font-bold text-primary md:text-base">
            {priceDisplay}
          </p>
          {/* === KẾT THÚC SỬA LỖI === */}
        </div>
      </div>
    </Link>
  );
}
