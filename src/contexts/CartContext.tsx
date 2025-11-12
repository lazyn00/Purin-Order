import React, { createContext, useContext, useState, ReactNode } from 'react';

// (Định nghĩa Product giữ nguyên)
export interface Product {
  id: number;
  name: string;
  price: number;
  priceDisplay: string;
  description: string[];
  images: string[];
  category: string;
  artist: string;
  // (Định nghĩa kiểu variants mới cho chính xác)
  variants: { name: string; price: number }[];
  optionGroups?: { name: string; options: string[] }[]; // Thêm cho sản phẩm 2 phân loại
  variantImageMap?: { [key: string]: number }; 
  feesIncluded?: boolean;
  master?: string;
  status?: string;
  orderDeadline?: string | null;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant: string; // Đổi thành string, vì chúng ta luôn có variant (kể cả "Full Set")
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, variant: string) => void;
  // === (SỬA ĐỔI) Thêm 'variant' vào 2 hàm này ===
  removeFromCart: (productId: number, variant: string) => void;
  updateQuantity: (productId: number, variant: string, quantity: number) => void;
  // === KẾT THÚC SỬA ĐỔI ===
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // (Hàm này đã đúng logic)
  const addToCart = (product: Product, quantity: number, variant: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && item.selectedVariant === variant
      );
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.selectedVariant === variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { ...product, quantity, selectedVariant: variant }];
    });
  };

  // === (SỬA ĐỔI) Thêm 'variant' để xóa đúng ===
  const removeFromCart = (productId: number, variant: string) => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === productId && item.selectedVariant === variant)
    ));
  };
  // === KẾT THÚC SỬA ĐỔI ===

  // === (SỬA ĐỔI) Thêm 'variant' để cập nhật đúng ===
  const updateQuantity = (productId: number, variant: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant); // Gọi hàm xóa đã sửa
      return;
    }
    setCartItems(prev =>
      prev.map(item => 
        (item.id === productId && item.selectedVariant === variant) 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  // === KẾT THÚC SỬA ĐỔI ===

  // (Hàm này đúng)
  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
