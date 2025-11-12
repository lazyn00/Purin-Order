// src/components/NavLink.tsx - CẬP NHẬT với menu Auth

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut, UserCircle, Bell } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext"; // THÊM MỚI
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function NavLink() {
  const location = useLocation();
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth(); // THÊM MỚI

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {/* Navigation Links */}
      <Link to="/">
        <Button
          variant={isActive("/") ? "default" : "ghost"}
          size="sm"
          className="text-xs sm:text-sm"
        >
          Trang chủ
        </Button>
      </Link>
      
      <Link to="/products">
        <Button
          variant={isActive("/products") ? "default" : "ghost"}
          size="sm"
          className="text-xs sm:text-sm"
        >
          Sản phẩm
        </Button>
      </Link>

      <Link to="/guide">
        <Button
          variant={isActive("/guide") ? "default" : "ghost"}
          size="sm"
          className="text-xs sm:text-sm"
        >
          Hướng dẫn
        </Button>
      </Link>

      {/* Cart Button */}
      <Link to="/checkout">
        <Button
          variant={isActive("/checkout") ? "default" : "ghost"}
          size="sm"
          className="relative text-xs sm:text-sm gap-1 sm:gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Giỏ hàng</span>
          {totalItems > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </Link>

      {/* THÊM MỚI - Auth Menu */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative gap-1 sm:gap-2">
              <UserCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{user?.name}</span>
              {user?.has_new_notification && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-2 w-2 p-0"
                />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/account" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Tài khoản của tôi
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/account?tab=notifications" className="cursor-pointer">
                <Bell className="mr-2 h-4 w-4" />
                Thông báo
                {user?.has_new_notification && (
                  <Badge variant="destructive" className="ml-auto">Mới</Badge>
                )}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <Button variant="outline" size="sm" className="gap-1 sm:gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Đăng nhập</span>
          </Button>
        </Link>
      )}
    </div>
  );
}
