import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Policy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Chính sách</h1>
          <p className="text-muted-foreground">Các chính sách quan trọng khi mua hàng</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chính sách đặt hàng Pre-order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Hàng pre-order là hàng đặt trước, thời gian về hàng dự kiến 2-4 tuần.</p>
              <p>• Khách hàng cần thanh toán trước ít nhất 50% giá trị đơn hàng để xác nhận đơn.</p>
              <p>• Trong trường hợp hàng về muộn hơn dự kiến, chúng tôi sẽ thông báo và hoàn tiền nếu khách hàng muốn hủy.</p>
              <p>• Đơn hàng pre-order không được hủy sau khi đã xác nhận và thanh toán cọc.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chính sách thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Chấp nhận thanh toán qua chuyển khoản ngân hàng và ví điện tử (Momo, ZaloPay).</p>
              <p>• Thanh toán đặt cọc: 50% giá trị đơn hàng khi đặt, 50% khi hàng về.</p>
              <p>• Thanh toán toàn bộ: Được giảm 5% tổng giá trị đơn hàng.</p>
              <p>• Thông tin chuyển khoản sẽ được gửi qua email/SMS sau khi đặt hàng.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chính sách vận chuyển</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Phí ship được tính theo khu vực: 30,000đ - 50,000đ.</p>
              <p>• Miễn phí ship toàn quốc cho đơn hàng trên 500,000đ.</p>
              <p>• Thời gian giao hàng: 2-5 ngày làm việc sau khi hàng về kho.</p>
              <p>• Khách hàng được kiểm tra hàng trước khi thanh toán.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chính sách đổi trả</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Chấp nhận đổi trả trong vòng 3 ngày nếu sản phẩm bị lỗi do nhà sản xuất.</p>
              <p>• Sản phẩm đổi trả phải còn nguyên seal, tem, nhãn mác và chưa qua sử dụng.</p>
              <p>• Không chấp nhận đổi trả với lý do: không thích, đổi ý, sai màu sắc mong muốn.</p>
              <p>• Phí ship đổi trả do bên có lỗi chịu.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chính sách bảo mật thông tin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Thông tin cá nhân của khách hàng được bảo mật tuyệt đối.</p>
              <p>• Thông tin chỉ được sử dụng cho mục đích xử lý đơn hàng.</p>
              <p>• Không chia sẻ thông tin khách hàng cho bên thứ ba.</p>
              <p>• Khách hàng có quyền yêu cầu xóa thông tin cá nhân bất cứ lúc nào.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Liên hệ hỗ trợ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>Nếu có bất kỳ thắc mắc nào về chính sách, vui lòng liên hệ:</p>
              <p>📧 Email: support@idolshop.vn</p>
              <p>📱 Hotline: 0901234567</p>
              <p>💬 Facebook: fb.com/idolshop</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
