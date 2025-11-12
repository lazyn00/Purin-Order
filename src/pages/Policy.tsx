// KHỐI JSX MỚI CHO CHÍNH SÁCH HOÀN TIỀN (ĐÃ ĐỒNG BỘ FONT VÀ MÀU)

<Card>
    <CardHeader>
        <CardTitle>5. Chính sách Hoàn tiền</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
        {/* Sửa: Loại bỏ font-semibold, text-foreground, text-red-500, chỉ dùng text-muted-foreground */}
        <ul className="list-disc list-inside space-y-3 pl-4 text-muted-foreground">
            <li>
                <span className="font-normal text-foreground">Mas hủy đoàn:</span> Purin hoàn đúng số tiền Mas đã trả + công cân.
            </li>
            <li>
                <span className="font-normal text-foreground">Hàng thất lạc:</span> Hoàn 50–100% tùy mức bồi thường của vận chuyển + công cân.
            </li>
            <li>
                <span className="font-normal text-foreground">Hàng thiếu/lỗi:</span> Hoàn theo số tiền được bồi thường của Mas sau khi xác nhận. Không bồi thường nếu Mas không xử lý.
            </li>
            <li>
                <span className="font-normal text-foreground">Trường hợp Mas gian lận (scam):</span> Không hoàn tiền 100%, chỉ hoàn công cân đã thu.
            </li>
        </ul>
        
        {/* Giữ nguyên phần lưu ý màu cam */}
        <div className="bg-yellow-50 border-l-4 border-amber-500 text-amber-700 p-4 rounded-md mt-6">
            <p className="font-bold">Lưu ý:</p>
            <p className="text-sm">Không hoàn tiền vì khác hình, lỗi xưởng, hoặc đổi ý.</p>
        </div>
    </CardContent>
</Card>
