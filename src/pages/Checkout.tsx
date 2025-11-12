// @/pages/Checkout.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
// === (SỬA LẠI: GỠ LOADER2) ===
import { ArrowLeft } from "lucide-react"; 
import { Separator } from "@/components/ui/separator";

// === DÁN LINK GOOGLE FORM CỦA BẠN VÀO ĐÂY ===
const GOOGLE_FORM_URL = "https://forms.gle/tTcYYvFw3BjzER8QA"; 
// === (ĐÃ GỠ BỎ APPS SCRIPT) ===


export default function Checkout() {
  const { cartItems, totalPrice } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  // === (GIỮ LẠI STATE THÔNG TIN KHÁCH HÀNG) ===
  const [customerInfo, setCustomerInfo] = useState({
    fb: "",
    email: "",
    phone: ""
  });
  // === (ĐÃ GỠ isSubmitting) ===

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // === (GIỮ LẠI VALIDATION) ===
    if (!customerInfo.phone && !customerInfo.email && !customerInfo.fb) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập ít nhất một thông tin liên hệ (SĐT, Email hoặc FB/IG).",
        variant: "destructive"
      });
      return;
    }
    
    // === (ĐÃ GỠ BỎ TOÀN BỘ LOGIC APPS SCRIPT VÀ FETCH) ===
    
    // === (SỬA LỖI: Chuyển hướng đến Google Form) ===
    window.location.href = GOOGLE_FORM_URL;
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
          <p className="text-muted-foreground mb-6">Bạn chưa có sản phẩm nào để đặt hàng.</p>
          <Button onClick={() => navigate("/products")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại mua sắm
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto max-w-2xl px-4 py-12">
        {/* Nút quay lại giỏ hàng */}
        <Button
          variant="ghost"
          onClick={() => navigate("/products")} // Hoặc -1 để quay lại
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Tiếp tục mua sắm
        </Button>
      
        <form onSubmit={handleSubmitOrder} className="space-y-8">
          
          {/* === (GIỮ NGUYÊN FORM THÔNG TIN) === */}
          <div className="rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Thông tin đặt hàng</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fb">Link Facebook / Instagram *</Label>
                <Input id="fb" value={customerInfo.fb} onChange={handleInputChange} placeholder="https... (cần ít nhất 1 trong 3)" />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={customerInfo.email} onChange={handleInputChange} placeholder="email@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input id="phone" type="tel" value={customerInfo.phone} onChange={handleInputChange} placeholder="090... (ưu tiên SĐT)" required />
              </div>
            </div>
          </div>

          {/* 2. Giỏ hàng (Giống ảnh) */}
          <div className="rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Giỏ hàng</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedVariant}`} className="flex items-center gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    {item.selectedVariant && (
                      <p className="text-sm text-muted-foreground">
                        {item.selectedVariant}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                    <p className="text-sm text-muted-foreground">SL: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Tổng cộng (Giống ảnh) */}
          <div className="rounded-lg border p-6 space-y-4">
            <div className="flex justify-between items-center text-lg font-medium">
              <span>Tổng cộng:</span>
              <span className="text-2xl font-bold text-primary">
                {totalPrice.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <Separator />
            <Button
              type="submit"
              className="w-full bg-gradient-primary"
              size="lg"
              // === (ĐÃ GỠ BỎ NÚT DISABLED VÀ LOADER) ===
            >
              Đặt hàng ngay
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
