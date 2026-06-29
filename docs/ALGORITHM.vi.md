# Thuật Toán Âm Lịch (LichTa Algorithm)

> 🇬🇧 [English version](./ALGORITHM.md)

Thư viện `lichta` sử dụng thuật toán tính Âm lịch Việt Nam được phát triển bởi **TS. Hồ Ngọc Đức** (Đại học Leipzig). Thuật toán này dựa trên các công thức thiên văn học chính xác từ cuốn sách *Astronomical Algorithms* của tác giả **Jean Meeus**.

## 1. Cơ sở Thiên Văn Học

Âm lịch không phải là một chuỗi ngày đếm ngẫu nhiên mà được tính toán chặt chẽ dựa trên vị trí tương đối của Mặt Trời, Mặt Trăng và Trái Đất.

### Điểm Sóc (New Moon)
Điểm Sóc là thời điểm mà kinh độ Mặt Trăng và kinh độ Mặt Trời bằng nhau (Mặt Trăng nằm giữa Trái Đất và Mặt Trời).
- **Quy tắc mùng 1**: Ngày bắt đầu của một tháng Âm lịch (mùng 1) luôn là ngày chứa **Điểm Sóc**.
- Do múi giờ tính toán của Việt Nam là **UTC+7** (trong khi Trung Quốc là UTC+8), có những thời điểm Điểm Sóc rơi vào trước 24:00 ở Việt Nam (tức là đã sang ngày mới ở Trung Quốc), dẫn đến mùng 1 của Việt Nam có thể lệch 1 ngày so với Trung Quốc.

### Tiết Khí & Trung Khí (Solar Terms)
Quỹ đạo của Trái Đất quanh Mặt Trời được chia làm 24 phần bằng nhau, gọi là 24 Tiết Khí. Trong đó, 12 điểm có kinh độ chẵn của Mặt Trời (0°, 30°, 60°...) được gọi là **Trung Khí**, và 12 điểm còn lại gọi là **Tiết Khí**.
- Một năm âm lịch bình thường có 12 tháng, mỗi tháng thường chứa ít nhất một Trung Khí.
- **Đông Chí** luôn rơi vào tháng 11 âm lịch.

## 2. Quy tắc tính Tháng Nhuận

Để đồng bộ giữa chu kỳ Mặt Trăng (Âm lịch) và quỹ đạo Trái Đất (Dương lịch), Âm lịch cần chèn thêm các tháng nhuận (leap month).
- **Năm nhuận**: Nếu khoảng thời gian giữa hai điểm Đông Chí liên tiếp có chứa 13 tháng âm lịch (thay vì 12 tháng), thì năm đó là năm nhuận âm lịch.
- **Xác định tháng nhuận**: Tháng đầu tiên trong năm nhuận đó mà **không chứa một Trung Khí nào** sẽ được lấy làm tháng nhuận.

## 3. Vai trò của Julian Day Number (JDN)

Để dễ dàng cộng trừ và tính toán khoảng cách giữa các ngày, thuật toán không dùng trực tiếp ngày/tháng/năm mà quy đổi mọi mốc thời gian về **Julian Day Number (JDN)**.
- JDN là tổng số ngày trôi qua kể từ 12:00 trưa ngày 1 tháng 1 năm 4713 trước Công nguyên.
- JDN cung cấp một trục thời gian tuyến tính liên tục, lý tưởng để áp dụng các công thức lượng giác phức tạp trong thiên văn học (tính toán kinh độ, vĩ độ thiên thể).

## 4. Đặc điểm của thư viện LichTa

- **Phạm vi tính toán**: Từ năm 1800 đến 2199 (400 năm). Trong khoảng thời gian này, các hằng số thiên văn đảm bảo độ chính xác cực cao cho vị trí các thiên thể.
- **Độ linh hoạt**: Thư viện cho phép truyền múi giờ (timezone offset) tùy chọn. Mặc định là UTC+7 cho Việt Nam. Có thể truyền `8` để tính âm lịch cho Trung Quốc, hoặc `9` cho Nhật Bản.

## 5. Tài liệu tham khảo
- [Âm Lịch Việt Nam - TS. Hồ Ngọc Đức](http://www.informatik.uni-leipzig.de/~duc/amlich/)
- *Astronomical Algorithms* - Jean Meeus (1998)
