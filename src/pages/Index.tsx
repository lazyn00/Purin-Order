import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Star, Package, Shield, Headphones } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Star className="w-8 h-8" />,
      title: "Hàng chính hãng",
      description: "100% sản phẩm chính hãng từ các nhà phân phối uy tín"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Pre-order nhanh chóng",
      description: "Đặt trước sản phẩm yêu thích, nhận hàng sớm nhất"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bảo hành đổi trả",
      description: "Chính sách bảo hành rõ ràng, hỗ trợ đổi trả tận tình"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ tư vấn nhiệt tình, sẵn sàng hỗ trợ mọi lúc"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Idol Shop - Nơi yêu thích của fan
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Chuyên cung cấp các sản phẩm idol chính hãng, hàng pre-order uy tín.
            Album, lightstick, photocard và nhiều merchandise độc đáo khác.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-gradient-primary text-lg px-8">
                Xem sản phẩm
              </Button>
            </Link>
            <Link to="/guide">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Hướng dẫn đặt hàng
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Tại sao chọn chúng tôi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 bg-gradient-primary rounded-lg text-primary-foreground w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Về chúng tôi
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Idol Shop được thành lập với mục tiêu mang đến cho các fan Việt Nam những sản phẩm
              idol chất lượng cao với giá cả hợp lý. Chúng tôi tự hào là đối tác tin cậy của
              nhiều nhà phân phối chính hãng tại Hàn Quốc, Nhật Bản và các quốc gia khác.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Với hệ thống pre-order chuyên nghiệp, chúng tôi cam kết mang đến trải nghiệm
              mua sắm tốt nhất cho cộng đồng fan Việt Nam. Mọi sản phẩm đều được kiểm tra
              kỹ lưỡng trước khi giao đến tay khách hàng.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">5000+</p>
                <p className="text-muted-foreground">Đơn hàng</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">3000+</p>
                <p className="text-muted-foreground">Khách hàng</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">100%</p>
                <p className="text-muted-foreground">Hài lòng</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-primary text-primary-foreground border-0">
            <CardContent className="text-center py-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sẵn sàng đặt hàng?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Khám phá ngay bộ sưu tập sản phẩm idol đa dạng của chúng tôi
              </p>
              <Link to="/products">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Xem sản phẩm ngay
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
