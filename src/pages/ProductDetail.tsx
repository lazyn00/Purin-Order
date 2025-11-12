import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Minus, Plus, CalendarOff } from "lucide-react";
import { productsData } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const product = productsData.find(p => p.id === Number(id));

  // --- (QUAN TRỌNG) NÂNG CẤP STATE ---
  // 1. State cho giá chung
  const [currentPrice, setCurrentPrice] = useState(product?.price || 0);
  
  // 2. State cho sản phẩm có 1 phân loại (ví dụ: "Full Set 5 members")
  const [selectedVariant, setSelectedVariant] = useState<string>(""); 
  
  // 3. State cho sản phẩm có nhiều phân loại (ví dụ: { "Kiểu viền": "Viền trong", "Thành viên": "James" })
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  
  // 4. State cho trạng thái
  const [isExpired, setIsExpired] = useState(false);
  // --- KẾT THÚC NÂNG CẤP STATE ---


  // useEffect cho Carousel (giữ nguyên)
  useEffect(() => {
    if (carouselApi && selectedVariant && product?.variantImageMap) {
      const imageIndex = product.variantImageMap[selectedVariant];
      if (imageIndex !== undefined) {
        carouselApi.scrollTo(imageIndex);
      }
    }
  }, [selectedVariant, carouselApi, product]);

  // useEffect để khởi tạo state khi tải trang
  useEffect(() => {
    if (product) {
      setCurrentPrice(product.price);
      
      if (product.orderDeadline) {
        const deadline = new Date(product.orderDeadline);
        if (deadline < new Date()) setIsExpired(true);
      } else if (product.status === "Sẵn") {
         setIsExpired(false);
      }
      
      // (MỚI) Khởi tạo state cho nhiều phân loại (id 4)
      if (product.optionGroups) {
        const initialOptions = product.optionGroups.reduce((acc, group) => {
            acc[group.name] = ""; // Bắt đầu rỗng
            return acc;
        }, {} as { [key: string]: string });
        setSelectedOptions(initialOptions);
      } 
      // (CŨ) Khởi tạo cho 1 phân loại (id 1, 2)
      else if (product.variants && product.variants.length === 1) {
          const firstVariant = product.variants[0];
          setSelectedVariant(firstVariant.name);
          setCurrentPrice(firstVariant.price);
      }
    }
  }, [product]);


  // === (THÊM MỚI) useEffect ĐỂ XỬ LÝ NHIỀU PHÂN LOẠI ===
  // Chạy mỗi khi người dùng chọn 1 option
  useEffect(() => {
    if (product?.optionGroups) {
      // Kiểm tra xem tất cả các group đã được chọn chưa
      const allOptionsSelected = Object.values(selectedOptions).every(val => val !== "");

      if (allOptionsSelected) {
        // 1. Gộp các lựa chọn thành chuỗi (ví dụ: "Viền trong-James")
        const constructedName = product.optionGroups
            .map(group => selectedOptions[group.name])
            .join("-");
        
        // 2. Tìm variant dựa trên chuỗi đã gộp
        const variant = product.variants.find(v => v.name === constructedName);
        
        if (variant) {
          // 3. Nếu tìm thấy -> cập nhật giá và state `selectedVariant`
          setCurrentPrice(variant.price);
          setSelectedVariant(variant.name); // state này sẽ dùng cho giỏ hàng
          
          // 4. Cập nhật ảnh carousel
          if (carouselApi && product.variantImageMap) {
            const imageIndex = product.variantImageMap[variant.name];
            if (imageIndex !== undefined) {
                carouselApi.scrollTo(imageIndex);
            }
          }
        } else {
          // Xử lý trường hợp tổ hợp không tồn tại (ví dụ: Viền màu-Full Set)
          // Tạm thời reset, bạn có thể đổi logic này
          setSelectedVariant("");
          setCurrentPrice(product.price); // Reset về giá gốc
          console.warn("Tổ hợp không hợp lệ:", constructedName);
        }
      }
    }
  }, [selectedOptions, product, carouselApi]);
  // === KẾT THÚC THÊM MỚI ===


  // Hàm Thêm vào giỏ hàng (giữ nguyên, vì nó đọc `selectedVariant`)
  const handleAddToCart = () => {
    const hasOptions = product.optionGroups && product.optionGroups.length > 0;
    const hasVariants = product.variants && product.variants.length > 0;

    // Kiểm tra chung (bất kể 1 hay nhiều phân loại)
    if (hasVariants && !selectedVariant) {
      toast({
        title: "Vui lòng chọn đủ phân loại",
        description: "Bạn cần chọn tất cả các phân loại sản phẩm",
        variant: "destructive"
      });
      return;
    }

    const correctPrice = currentPrice; // Giá đã được cập nhật bởi useEffect

    const productToAdd = {
      ...product,
      price: correctPrice,
      priceDisplay: `${correctPrice.toLocaleString('vi-VN')}đ`
    };
    
    addToCart(productToAdd, quantity, selectedVariant);

    toast({
      title: "Đã thêm vào giỏ hàng!",
      description: `${product.name}${selectedVariant ? ` (${selectedVariant})` : ''} x${quantity}`,
    });
  };

  // (MỚI) Hàm xử lý cho NHIỀU phân loại (id 4)
  const handleOptionChange = (groupName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [groupName]: value,
    }));
  };

  // (CŨ) Hàm xử lý cho MỘT phân loại (id 3)
  const handleVariantChange = (variantName: string) => {
    setSelectedVariant(variantName);
    const variant = product.variants.find(v => v.name === variantName);
    if (variant) {
      setCurrentPrice(variant.price);
    }
  };

  // ... (increment/decrement quantity giữ nguyên) ...
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ... (Phần Image Carousel và Thumbnail giữ nguyên) ... */}
          <div className="space-y-4">
            <Carousel className="w-full" setApi={setCarouselApi}>
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative overflow-hidden rounded-lg border">
                      <img
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {product.images.length > 1 && (
                <>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </>
              )}
            </Carousel>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 cursor-pointer"
                    onClick={() => carouselApi?.scrollTo(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumb ${index + 1}`}
                      className="w-20 h-20 object-cover rounded border hover:border-primary transition-colors"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* ... (Tên, Trạng thái, Giá, Hạn order giữ nguyên) ... */}
            <div>
              {product.status && (
                <Badge variant="secondary" className="mb-3">
                  {product.status}
                </Badge>
              )}
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            </div>

            <div className="border-t pt-4">
              <p className="text-4xl font-bold text-primary">
                {currentPrice.toLocaleString('vi-VN')}đ
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                *{product.feesIncluded ? 'Đã full phí dự kiến' : 'Chưa full phí'}
              </p>
              {product.orderDeadline && !isExpired && (
                 <p className="text-sm text-amber-600 mt-2">
                   Hạn order: {new Date(product.orderDeadline).toLocaleString('vi-VN')}
                 </p>
              )}
              {isExpired && (
                 <p className="text-sm text-destructive mt-2">
                   Đã hết hạn order
                 </p>
              )}
            </div>

            {/* === (NÂNG CẤP) LOGIC HIỂN THỊ PHÂN LOẠI === */}
            <div className="border-t pt-4 space-y-4">
              {/* TRƯỜNG HỢP 1: Có NHIỀU phân loại (id 4) */}
              {product.optionGroups && (
                product.optionGroups.map((group) => (
                  <div key={group.name}>
                    <Label htmlFor={`variant-${group.name}`} className="text-base font-semibold">
                      {group.name} *
                    </Label>
                    <Select 
                      value={selectedOptions[group.name]} 
                      onValueChange={(value) => handleOptionChange(group.name, value)}
                    >
                      <SelectTrigger id={`variant-${group.name}`} className="mt-2">
                        <SelectValue placeholder={`Chọn ${group.name.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {group.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))
              )}

              {/* TRƯỜNG HỢP 2: Có MỘT phân loại (id 3) */}
              {!product.optionGroups && product.variants && product.variants.length > 1 && (
                <div>
                  <Label htmlFor="variant" className="text-base font-semibold">
                    Phân loại *
                  </Label>
                  <Select 
                    value={selectedVariant} 
                    onValueChange={handleVariantChange}
                  >
                    <SelectTrigger id="variant" className="mt-2">
                      <SelectValue placeholder="Chọn phân loại" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.variants.map((variant) => (
                        <SelectItem key={variant.name} value={variant.name}>
                          <div className="flex items-center gap-2">
                            {product.variantImageMap && product.variantImageMap[variant.name] !== undefined && (
                              <img 
                                src={product.images[product.variantImageMap[variant.name]]} 
                                alt={variant.name}
                                className="w-8 h-8 object-cover rounded border"
                              />
                            )}
                            <span>{variant.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* TRƯỜNG HỢP 3: Chỉ có 1 variant hoặc không có (id 1, 2) -> không hiển thị gì */}

            </div>
            {/* === KẾT THÚC NÂNG CẤP === */}


            {/* ... (Phần Quantity và Action Buttons giữ nguyên) ... */}
            <div className="border-t pt-4">
              <Label htmlFor="quantity" className="text-base font-semibold">
                Số lượng
              </Label>
              <div className="flex items-center gap-4 mt-2">
                <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                />
                <Button variant="outline" size="icon" onClick={incrementQuantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="border-t pt-4 space-y-3">
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-gradient-primary gap-2"
                size="lg"
                disabled={isExpired}
              >
                {isExpired ? <CalendarOff className="h-5 w-4" /> : <ShoppingCart className="h-5 w-5" />}
                {isExpired ? "Đã hết hạn order" : "Thêm vào giỏ hàng"}
              </Button>
              <Button 
                onClick={() => navigate("/products")}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Tiếp tục mua sắm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
