import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Facebook, Instagram, MessageSquare, Music2 } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Liên hệ</h1>
          <p className="text-muted-foreground">Purin Order luôn sẵn sàng hỗ trợ bạn 💛</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Điện thoại</p>
                    <a href="tel:0395939035" className="text-muted-foreground hover:text-primary">
                      0395 939 035
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:purinorder@gmail.com" className="text-muted-foreground hover:text-primary">
                      purinorder@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Địa chỉ</p>
                    <p className="text-muted-foreground">TP. Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mạng xã hội</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a 
                  href="https://facebook.com/purinorder" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                  <span>Facebook: Purin Order</span>
                </a>
                <a 
                  href="https://instagram.com/purinorder" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span>Instagram: @purinorder</span>
                </a>
                <a 
                  href="https://t.me/purinorder" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Telegram: @purinorder</span>
                </a>
                <a 
                  href="https://tiktok.com/@purinorder" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Music2 className="h-5 w-5" />
                  <span>TikTok: @purinorder</span>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Giờ làm việc</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Thứ 2 - Thứ 6: 9:00 - 18:00<br />
                  Thứ 7: 9:00 - 16:00<br />
                  Chủ nhật: Nghỉ
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
