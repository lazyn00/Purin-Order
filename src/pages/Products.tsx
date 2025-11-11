import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const products = [
  {
    id: 1,
    name: "Photocard Set - Limited Edition",
    price: "350,000đ",
    description: "Bộ photocard giới hạn với 10 ảnh chất lượng cao",
    image: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=500",
    status: "Pre-order"
  },
  {
    id: 2,
    name: "Light Stick Official",
    price: "850,000đ",
    description: "Lightstick chính hãng kết nối Bluetooth",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=500",
    status: "Pre-order"
  },
  {
    id: 3,
    name: "Album - Special Edition",
    price: "450,000đ",
    description: "Album đặc biệt kèm photobook và poster",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500",
    status: "Pre-order"
  },
  {
    id: 4,
    name: "Poster Set A4",
    price: "180,000đ",
    description: "Bộ 5 poster kích thước A4 chất lượng cao",
    image: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=500",
    status: "Pre-order"
  },
  {
    id: 5,
    name: "Keychain Collection",
    price: "120,000đ",
    description: "Bộ sưu tập móc khóa acrylic",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
    status: "Pre-order"
  },
  {
    id: 6,
    name: "Tote Bag Limited",
    price: "280,000đ",
    description: "Túi tote vải canvas in hình giới hạn",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500",
    status: "Pre-order"
  },
];

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    quantity: "1",
    note: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) return;

    // TODO: Gửi data vào Google Sheet qua edge function
    console.log("Order data:", {
      product: selectedProduct.name,
      ...formData,
      orderDate: new Date().toISOString()
    });

    toast({
      title: "Đặt hàng thành công!",
      description: "Chúng tôi sẽ liên hệ với bạn sớm nhất.",
    });

    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      quantity: "1",
      note: ""
    });
    setSelectedProduct(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Sản phẩm Pre-order</h1>
          <p className="text-muted-foreground">Đặt trước các sản phẩm idol yêu thích của bạn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <Badge variant="secondary">{product.status}</Badge>
                </div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">{product.price}</p>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-primary"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Đặt hàng ngay
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Đặt hàng: {product.name}</DialogTitle>
                      <DialogDescription>
                        Giá: {product.price}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Họ và tên *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Số điện thoại *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0901234567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Địa chỉ nhận hàng *</Label>
                        <Textarea
                          id="address"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                        />
                      </div>
                      <div>
                        <Label htmlFor="quantity">Số lượng *</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          required
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="note">Ghi chú</Label>
                        <Textarea
                          id="note"
                          value={formData.note}
                          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                          placeholder="Ghi chú thêm cho đơn hàng (nếu có)"
                        />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-primary">
                        Xác nhận đặt hàng
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
