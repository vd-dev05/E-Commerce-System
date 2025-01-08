import { assets } from "@/assets/assets";

// menu
export const shoppingHeaderItems = [
    {
        id: 1,
        label: "Hỗ trợ",
        name: "support",
        path: "/shop/support"
    },
    {
        id: 2,
        label: "Kênh Người Bán",
        name: "seller",
        path: "/shop/seller"
    },
    {
        id: 3,
        label: "Đổi ngôn ngữ",
        name: "language",
        path: "/shop/language"
    },
    {
        id: 4,
        label: "Thông báo",
        name: "notification",
        icon: assets.notification,

        path: "/shop/notification"
    },
    {
        id: 5,
        label: "Đăng Nhập",
        name: "login",
        path: "/shop/login"
    },
    {
        id: 6,
        label: "Đăng Ký",
        name: "register",
        path: "/shop/register"
    },

]

// category list
export const categoryList = [
    { id: 1, label: "thoi trang nam", url: assets.men, path: "men" },
    { id: 2, label: "thoi trang nu", url: assets.women, path: "women" },
    { id: 3, label: "giay", url: assets.shoes, path: "shoes" },
    { id: 4, label: "dong ho", url: assets.clock, path: "clock" },
    { id: 5, label: "do gia dung", url: assets.appliances, path: "appliances" },
    { id: 6, label: "dien thoai", url: assets.phone, path: "phone" },
]

export const allcategory =  {
    // api , data shoppe clone 
    B : {
        "Balo_Túi_Ví_Nam" : [
            { id: 1, name: "Ba lô nam", path: "ba-lo-nam" , url : '/balo-tui-vi-nam/ba-lo-nam' },
            { id: 2, name: "Ba Lô Laptop Nam", url: "/balo-tui-vi-nam/ba-lo-laptop-nam" },
            { id: 3, name: "Túi & Cặp Đựng Laptop", url: "/balo-tui-vi-nam/tui-cap-dung-laptop" },
            { id: 4, name: "Túi Chống Sốc Laptop Nam", url: "/balo-tui-vi-nam/tui-chong-soc-laptop-nam" },
            { id: 5, name: "Túi Tote Nam", url: "/balo-tui-vi-nam/tui-tote-nam" },
            { id: 6, name: "Cặp Xách Công Sở Nam", url: "/balo-tui-vi-nam/cap-xach-cong-so-nam" },
            { id: 7, name: "Ví Cầm Tay Nam", url: "/balo-tui-vi-nam/vi-cam-tay-nam" },
            { id: 8, name: "Túi Đeo Hông & Túi Đeo Ngực Nam", url: "/balo-tui-vi-nam/tui-deo-hong-tui-deo-nguc-nam" },
            { id: 9, name: "Túi Đeo Chéo Nam", url: "/balo-tui-vi-nam/tui-deo-cheo-nam" },
            { id: 10, name: "Bóp/Ví Nam", url: "/balo-tui-vi-nam/bop-vi-nam" },
            { id: 11, name: "Khác", url: "/balo-tui-vi-nam/khac" }
        ]
    },
    C: {
        "Chăm_Sóc_Thú_Cưng" :[
            { id: 1, name: "Phụ kiện cho thú cưng", url: "/cham-soc-thu-cung/phu-kien-cho-thu-cung" },
            { id: 2, name: "Vệ sinh cho thú cưng", url: "/cham-soc-thu-cung/ve-sinh-cho-thu-cung" },
            { id: 3, name: "Quần áo thú cưng", url: "/cham-soc-thu-cung/quan-ao-thu-cung" },
            { id: 4, name: "Chăm sóc sức khỏe", url: "/cham-soc-thu-cung/cham-soc-suc-khoe" },
            { id: 5, name: "Làm đẹp cho thú cưng", url: "/cham-soc-thu-cung/lam-dep-cho-thu-cung" },
            { id: 6, name: "Khác", url: "/cham-soc-thu-cung/khac" }

        ]
    },
    D : {
        "Dung_Cu_Va_Thiet_Bi_Tien_Ich" : [
            { id: 1, name: "Dụng cụ cầm tay", url: "/dung-cu-va-thiet-bi-tien-ich/dung-cu-cam-tay" },
            { id: 2, name: "Dụng cụ điện và thiết bị lớn", url: "/dung-cu-va-thiet-bi-tien-ich/dung-cu-dien-va-thiet-bi-lon" },
            { id: 3, name: "Thiết bị mạch điện", url: "/dung-cu-va-thiet-bi-tien-ich/thiet-bi-mach-dien" },
            { id: 4, name: "Vật liệu xây dựng", url: "/dung-cu-va-thiet-bi-tien-ich/vat-lieu-xay-dung" },
            { id: 5, name: "Thiết bị và phụ kiện xây dựng", url: "/dung-cu-va-thiet-bi-tien-ich/thiet-bi-va-phu-kien-xay-dung" },
            { id: 6, name: "Điện Thoại & Phụ Kiện", url: "/dung-cu-va-thiet-bi-tien-ich/dien-thoai-phu-kien" },
            { id: 7, name: "Máy tính bảng", url: "/dung-cu-va-thiet-bi-tien-ich/may-tinh-bang" },
            { id: 8, name: "Pin Dự Phòng", url: "/dung-cu-va-thiet-bi-tien-ich/pin-du-phong" },
            { id: 9, name: "Pin Gắn Trong, Cáp và Bộ Sạc", url: "/dung-cu-va-thiet-bi-tien-ich/pin-gan-trong-cap-va-bo-sac" },
            { id: 10, name: "Ốp lưng, bao da, Miếng dán điện thoại", url: "/dung-cu-va-thiet-bi-tien-ich/op-lung-bao-da-mieng-dan-dien-thoai" },
            { id: 11, name: "Bảo vệ màn hình", url: "/dung-cu-va-thiet-bi-tien-ich/bao-ve-man-hinh" },
            { id: 12, name: "Đế giữ điện thoại", url: "/dung-cu-va-thiet-bi-tien-ich/de-giu-dien-thoai" },
            { id: 13, name: "Thẻ nhớ", url: "/dung-cu-va-thiet-bi-tien-ich/the-nho" },
            { id: 14, name: "Sim", url: "/dung-cu-va-thiet-bi-tien-ich/sim" },
            { id: 15, name: "Phụ kiện khác", url: "/dung-cu-va-thiet-bi-tien-ich/phu-kien-khac" },
            { id: 16, name: "Thiết bị khác", url: "/dung-cu-va-thiet-bi-tien-ich/thiet-bi-khac" }

        ],
        "Do_Choi_So_Thich" : [
            { id: 1, name: "Đồ chơi giải trí", url: "/do-choi-so-thich/do-choi-giai-tri" },
            { id: 2, name: "Đồ chơi giáo dục", url: "/do-choi-so-thich/do-choi-giao-duc" },
            { id: 3, name: "Đồ chơi cho trẻ sơ sinh & trẻ nhỏ", url: "/do-choi-so-thich/do-choi-cho-tre-so-sinh-va-tre-nho" },
            { id: 4, name: "Đồ chơi vận động & ngoài trời", url: "/do-choi-so-thich/do-choi-van-dong-va-ngoai-troi" },
            { id: 5, name: "Búp bê & Đồ chơi nhồi bông", url: "/do-choi-so-thich/bup-be-do-choi-nhoi-bong" }
        ],
        "Dong_Ho" : [
            { id: 1, name: "Đồng Hồ Nam", url: "/dong-ho/dong-ho-nam" },
            { id: 2, name: "Đồng Hồ Nữ", url: "/dong-ho/dong-ho-nu" },
            { id: 3, name: "Bộ Đồng Hồ & Đồng Hồ Cặp", url: "/dong-ho/bo-dong-ho-va-dong-ho-cap" },
            { id: 4, name: "Đồng Hồ Trẻ Em", url: "/dong-ho/dong-ho-tre-em" },
            { id: 5, name: "Phụ Kiện Đồng Hồ", url: "/dong-ho/phu-kien-dong-ho" },
            { id: 6, name: "Khác", url: "/dong-ho/khac" }

        ]
    },
    G : {
        "Giay_Dep_Nam" : [
            { id: 1, name: "Bốt", url: "/giay-dep-nam/bot" },
            { id: 2, name: "Giày Thể Thao/ Sneakers", url: "/giay-dep-nam/giay-the-thao-sneakers" },
            { id: 3, name: "Giày Sục", url: "/giay-dep-nam/giay-suc" },
            { id: 4, name: "Giày Tây Lười", url: "/giay-dep-nam/giay-tay-luoi" },
            { id: 5, name: "Giày Oxfords & Giày Buộc Dây", url: "/giay-dep-nam/giay-oxfords-giay-buoc-day" },
            { id: 6, name: "Xăng-đan và Dép", url: "/giay-dep-nam/xang-dan-va-dep" },
            { id: 7, name: "Phụ kiện giày dép", url: "/giay-dep-nam/phu-kien-giay-dep" },
            { id: 8, name: "Khác", url: "/giay-dep-nam/khac" }
        ],
        "Giay_Dep_Nu" : [
            { id: 1, name: "Bốt", url: "/giay-dep-nu/bot" },
            { id: 2, name: "Giày Thể Thao/ Sneaker", url: "/giay-dep-nu/giay-the-thao-sneaker" },
            { id: 3, name: "Giày Đế Bằng", url: "/giay-dep-nu/giay-de-bang" },
            { id: 4, name: "Giày Cao Gót", url: "/giay-dep-nu/giay-cao-got" },
            { id: 5, name: "Giày Đế Xuồng", url: "/giay-dep-nu/giay-de-xuong" },
            { id: 6, name: "Xăng-đan Và Dép", url: "/giay-dep-nu/xang-dan-va-dep" },
            { id: 7, name: "Phụ Kiện Giày", url: "/giay-dep-nu/phu-kien-giay" },
            { id: 8, name: "Khác", url: "/giay-dep-nu/khac" }
        ],
        "Giat_Giu_Cham_Soc_Nha_Cua" : [
            { id: 1, name: "Giặt giũ & Chăm sóc nhà cửa", url: "/giat-giu-cham-soc-nha-cua/giat-giu-cham-soc-nha-cua" },
            { id: 2, name: "Giấy vệ sinh, khăn giấy", url: "/giat-giu-cham-soc-nha-cua/giay-ve-sinh-khan-giay" },
            { id: 3, name: "Vệ sinh nhà cửa", url: "/giat-giu-cham-soc-nha-cua/ve-sinh-nha-cua" },
            { id: 4, name: "Vệ sinh bát đĩa", url: "/giat-giu-cham-soc-nha-cua/ve-sinh-bat-dia" },
            { id: 5, name: "Dụng cụ vệ sinh", url: "/giat-giu-cham-soc-nha-cua/dung-cu-ve-sinh" },
            { id: 6, name: "Chất khử mùi, làm thơm", url: "/giat-giu-cham-soc-nha-cua/chat-khu-mui-lam-thom" },
            { id: 7, name: "Thuốc diệt côn trùng", url: "/giat-giu-cham-soc-nha-cua/thuoc-diet-con-trung" },
            { id: 8, name: "Túi, màng bọc thực phẩm", url: "/giat-giu-cham-soc-nha-cua/tui-mang-boc-thuc-pham" },
            { id: 9, name: "Bao bì, túi đựng rác", url: "/giat-giu-cham-soc-nha-cua/bao-bi-tui-dung-rac" }
        ]
    },
    M : {
        "May_Tinh_Laptop" : [
            { id: 1, name: "Máy Tính Bàn", url: "/may-tinh-laptop/may-tinh-ban" },
            { id: 2, name: "Màn Hình", url: "/may-tinh-laptop/man-hinh" },
            { id: 3, name: "Linh Kiện Máy Tính", url: "/may-tinh-laptop/linh-kien-may-tinh" },
            { id: 4, name: "Thiết Bị Lưu Trữ", url: "/may-tinh-laptop/thiet-bi-luu-tru" },
            { id: 5, name: "Thiết Bị Mạng", url: "/may-tinh-laptop/thiet-bi-mang" },
            { id: 6, name: "Máy In, Máy Scan & Máy Chiếu", url: "/may-tinh-laptop/may-in-may-scan-may-chieu" },
            { id: 7, name: "Phụ Kiện Máy Tính", url: "/may-tinh-laptop/phu-kien-may-tinh" },
            { id: 8, name: "Laptop", url: "/may-tinh-laptop/laptop" },
            { id: 9, name: "Khác", url: "/may-tinh-laptop/khac" }
        ],
        "May_An_May_Quay_Phim" : [
            { id: 1, name: "Máy ảnh - Máy quay phim", url: "/may-an-may-quay-phin/may-an-may-quay-phin" },
            { id: 2, name: "Camera giám sát & Camera hệ thống", url: "/may-an-may-quay-phin/camera-giam-sat-camera-he-thong" },
            { id: 3, name: "Thẻ nhớ", url: "/may-an-may-quay-phin/the-nho" },
            { id: 4, name: "Ống kính", url: "/may-an-may-quay-phin/ong-kinh" },
            { id: 5, name: "Phụ kiện máy ảnh", url: "/may-an-may-quay-phin/phu-kien-may-an" },
            { id: 6, name: "Máy bay camera & Phụ kiện", url: "/may-an-may-quay-phin/may-bay-camera-phu-kien" }
        ],
        "Me_Be" : [
            { id: 1, name: "Đồ dùng du lịch cho bé", url: "/me-be/do-dung-du-lich-cho-be" },
            { id: 2, name: "Đồ dùng ăn dặm cho bé", url: "/me-be/do-dung-an-dam-cho-be" },
            { id: 3, name: "Phụ kiện cho mẹ", url: "/me-be/phu-kien-cho-me" },
            { id: 4, name: "Chăm sóc sức khỏe mẹ", url: "/me-be/cham-soc-suc-khoe-me" },
            { id: 5, name: "Đồ dùng phòng tắm & Chăm sóc cơ thể bé", url: "/me-be/do-dung-phong-tam-cham-soc-co-the-be" },
            { id: 6, name: "Đồ dùng phòng ngủ cho bé", url: "/me-be/do-dung-phong-ngu-cho-be" },
            { id: 7, name: "An toàn cho bé", url: "/me-be/an-toan-cho-be" },
            { id: 8, name: "Thực phẩm cho bé", url: "/me-be/thuc-pham-cho-be" },
            { id: 9, name: "Chăm sóc sức khỏe bé", url: "/me-be/cham-soc-suc-khoe-be" },
            { id: 10, name: "Tã & bô em bé", url: "/me-be/ta-bo-em-be" },
            { id: 11, name: "Đồ chơi", url: "/me-be/do-choi" },
            { id: 12, name: "Bộ & Gói quà tặng", url: "/me-be/bo-goi-qua-tang" },
            { id: 13, name: "Sữa công thức trên 24 tháng", url: "/sua-cong-thuong/sua-cong-thuong-tren-24-thang" },
            { id: 14, name: "Sữa công thức 0-24 tháng tuổi", url: "/sua-cong-thuong/sua-cong-thuong-0-24-thang-tuoi" },
            { id: 15, name: "Khác", url: "/me-be/khac" }
        ],
    },
    N : {
        "Nha_Cua_Doi_Song" : [
            { id: 1, name: "Chăn, Ga, Gối & Nệm", url: "/nha-cua-doi-song/chan-ga-goi-nem" },
            { id: 2, name: "Đồ nội thất", url: "/nha-cua-doi-song/do-noi-that" },
            { id: 3, name: "Trang trí nhà cửa", url: "/nha-cua-doi-song/trang-tri-nha-cua" },
            { id: 4, name: "Dụng cụ & Thiết bị tiện ích", url: "/nha-cua-doi-song/dung-cu-thiet-bi-tien-ich" },
            { id: 5, name: "Đồ dùng nhà bếp và hộp đựng thực phẩm", url: "/nha-cua-doi-song/do-dung-nha-bep-va-hop-dung-thuc-pham" },
            { id: 6, name: "Đèn Ngoài trời & Sân vườn", url: "/nha-cua-doi-song/den-ngoai-tri-va-san-vuon" },
            { id: 7, name: "Đồ dùng phòng tắm", url: "/nha-cua-doi-song/do-dung-phong-tam" },
            { id: 8, name: "Vật phẩm thờ cúng", url: "/nha-cua-doi-song/vat-pham-tho-cung" },
            { id: 9, name: "Đồ trang trí tiệc", url: "/nha-cua-doi-song/do-trang-tri-tiec" },
            { id: 10, name: "Chăm sóc nhà cửa và giặt ủi", url: "/nha-cua-doi-song/cham-soc-nha-cua-va-giat-ui" },
            { id: 11, name: "Sắp xếp nhà cửa", url: "/nha-cua-doi-song/sap-xep-nha-cua" },
            { id: 12, name: "Dụng cụ pha chế", url: "/nha-cua-doi-song/dung-cu-pha-che" },
            { id: 13, name: "Tinh dầu thơm phòng", url: "/nha-cua-doi-song/tinh-dau-thom-phong" },
            { id: 14, name: "Đồ dùng phòng ăn", url: "/nha-cua-doi-song/do-dung-phong-an" },
            { id: 15, name: "Nhà Sách Online", url: "/nha-cua-doi-song/nha-sach-online" },
            { id: 16, name: "Sách Tiếng Việt", url: "/nha-cua-doi-song/sach-tieng-viet" },
            { id: 17, name: "Sách ngoại văn", url: "/nha-cua-doi-song/sach-ngoai-van" },
            { id: 18, name: "Gói Quà", url: "/nha-cua-doi-song/goi-qua" },
            { id: 19, name: "Bút viết", url: "/nha-cua-doi-song/but-viet" },
            { id: 20, name: "Dụng cụ học sinh & văn phòng", url: "/nha-cua-doi-song/dung-cu-hoc-sinh-va-van-phong" },
            { id: 21, name: "Màu, Họa Cụ và Đồ Thủ Công", url: "/nha-cua-doi-song/mau-hoa-cu-va-do-thu-cong" },
            { id: 22, name: "Sổ và Giấy", url: "/nha-cua-doi-song/so-va-giay" },
            { id: 23, name: "Các Loại Quà Lưu Niệm", url: "/nha-cua-doi-song/cac-loai-qua-luu-niem" },
            { id: 24, name: "Nhạc cụ và phụ kiện âm nhạc", url: "/nha-cua-doi-song/nhac-cu-va-phu-kien-am-nhac" },
            { id: 25, name: "Khác", url: "/nha-cua-doi-song/khac" }
        ]
    },
    T  : {
        "Thiết Bị Điện Gia Dụng" : [
            { id: 1, name: "Đồ gia dụng nhà bếp", url: "/thiet-bi-dien-gia-dung/do-gia-dung-nha-bep" },
            { id: 2, name: "Đồ gia dụng lớn", url: "/thiet-bi-dien-gia-dung/do-gia-dung-lon" },
            { id: 3, name: "Máy hút bụi & Thiết bị làm sạch", url: "/thiet-bi-dien-gia-dung/may-hut-bui-va-thiet-bi-lam-sach" },
            { id: 4, name: "Quạt & Máy nóng lạnh", url: "/thiet-bi-dien-gia-dung/quat-va-may-nong-lanh" },
            { id: 5, name: "Thiết bị chăm sóc quần áo", url: "/thiet-bi-dien-gia-dung/thiet-bi-cham-soc-quan-ao" },
            { id: 6, name: "Khác", url: "/thiet-bi-dien-gia-dung/khac" }
        ],
       "Thiết Bị Điện Tử" : [
            { id: 1, name: "Thiết bị đeo thông minh", url: "/thiet-bi-dien-tu/thiet-bi-deo-thong-minh" },
            { id: 2, name: "Phụ kiện tivi", url: "/thiet-bi-dien-tu/phu-kien-tivi" },
            { id: 3, name: "Máy Game Console", url: "/thiet-bi-dien-tu/may-game-console" },
            { id: 4, name: "Phụ kiện Console", url: "/thiet-bi-dien-tu/phu-kien-console" },
            { id: 5, name: "Đĩa game", url: "/thiet-bi-dien-tu/dia-game" },
            { id: 6, name: "Linh phụ kiện", url: "/thiet-bi-dien-tu/linh-phu-kien" },
            { id: 7, name: "Tai nghe nhét tai", url: "/thiet-bi-dien-tu/tai-nghe-nhet-tai" },
            { id: 8, name: "Loa", url: "/thiet-bi-dien-tu/loa" },
            { id: 9, name: "Tivi", url: "/thiet-bi-dien-tu/tivi" },
            { id: 10, name: "Tivi Box", url: "/thiet-bi-dien-tu/tivi-box" },
            { id: 11, name: "Headphones", url: "/thiet-bi-dien-tu/headphones" },
        ],
        "Thể Thao & Du Lịch" : [
            { id: 1, name: "Vali Túi du lịch", url: "/the-thao-du-lich/vali-tui-du-lich" },
            { id: 2, name: "Phụ kiện du lịch", url: "/the-thao-du-lich/phu-kien-du-lich" },
            { id: 3, name: "Dụng Cụ Thể Thao & Dã Ngoại", url: "/the-thao-du-lich/dung-cu-the-thao-va-da-ngoai" },
            { id: 4, name: "Giày Thể Thao", url: "/the-thao-du-lich/giay-the-thao" },
            { id: 5, name: "Thời Trang Thể Thao & Dã Ngoại", url: "/the-thao-du-lich/thoi-trang-the-thao-va-da-ngoai" },
            { id: 6, name: "Phụ Kiện Thể Thao & Dã Ngoại", url: "/the-thao-du-lich/phu-kien-the-thao-va-da-ngoai" },
            { id: 7, name: "Khác", url: "/the-thao-du-lich/khac" },
        ],
        "Thời Trang Nam" : [
            { id: 1, name: "Áo Khoác", url: "/thoi-trang-nam/ao-khoac" },
            { id: 2, name: "Áo Vest và Blazer", url: "/thoi-trang-nam/ao-vest-va-blazer" },
            { id: 3, name: "Áo Hoodie", url: "/thoi-trang-nam/ao-hoodie" },
            { id: 4, name: "Áo Len & Áo Nỉ", url: "/thoi-trang-nam/ao-len-va-ao-ni" },
            { id: 5, name: "Quần Jeans", url: "/thoi-trang-nam/quan-jeans" },
            { id: 6, name: "Quần Dài/Quần Âu", url: "/thoi-trang-nam/quan-dai-quan-au" },
            { id: 7, name: "Quần Short", url: "/thoi-trang-nam/quan-short" },
            { id: 8, name: "Áo Áo Ba Lỗ", url: "/thoi-trang-nam/ao-ao-ba-lo" },
            { id: 9, name: "Đồ Lót", url: "/thoi-trang-nam/do-lot" },
            { id: 10, name: "Đồ Ngủ", url: "/thoi-trang-nam/do-ngu" },
            { id: 11, name: "Đồ Bộ", url: "/thoi-trang-nam/do-bo" },
            { id: 12, name: "Vớ/Tất", url: "/thoi-trang-nam/vo-tat" },
            { id: 13, name: "Trang Phục Truyền Thống", url: "/thoi-trang-nam/trang-phuc-truyen-thong" },
            { id: 14, name: "Đồ Hóa Trang", url: "/thoi-trang-nam/do-hoa-trang" },
            { id: 15, name: "Trang Phục Ngành Nghề", url: "/thoi-trang-nam/trang-phuc-nganh-nghe" },
            { id: 16, name: "Khác", url: "/thoi-trang-nam/khac" },
            { id: 17, name: "Kính Mắt Nam", url: "/thoi-trang-nam/kinh-mat-nam" },
            { id: 18, name: "Thắt Lưng Nam", url: "/thoi-trang-nam/that-lung-nam" },
            { id: 19, name: "Cà vạt & Nơ cổ", url: "/thoi-trang-nam/ca-vat-va-no-co" },
            { id: 20, name: "Phụ Kiện Nam", url: "/thoi-trang-nam/phu-kien-nam" }
        ],
        "Thời trang Nữ" : [
            { id: 1, name: "Quần", url: "/thoi-trang-nu/quan" },
            { id: 2, name: "Quần đùi", url: "/thoi-trang-nu/quan-dui" },
            { id: 3, name: "Chân váy", url: "/thoi-trang-nu/chan-vay" },
            { id: 4, name: "Quần jeans", url: "/thoi-trang-nu/quan-jeans" },
            { id: 5, name: "Đầm/Váy", url: "/thoi-trang-nu/dam-vay" },
            { id: 6, name: "Váy cưới", url: "/thoi-trang-nu/vay-cuoi" },
            { id: 7, name: "Áo khoác, Áo choàng & Vest", url: "/thoi-trang-nu/ao-khoac-ao-choang-va-vest" },
            { id: 8, name: "Áo len & Cardigan", url: "/thoi-trang-nu/ao-len-va-cardigan" },
            { id: 9, name: "Hoodie và Áo nỉ", url: "/thoi-trang-nu/hoodie-va-ao-ni" },
            { id: 10, name: "Bộ", url: "/thoi-trang-nu/bo" },
            { id: 11, name: "Đồ lót", url: "/thoi-trang-nu/do-lot" },
            { id: 12, name: "Đồ ngủ", url: "/thoi-trang-nu/do-ngu" },
            { id: 13, name: "Áo", url: "/thoi-trang-nu/ao" },
            { id: 14, name: "Đồ tập", url: "/thoi-trang-nu/do-tap" },
            { id: 15, name: "Đồ Bầu", url: "/thoi-trang-nu/do-bau" },
            { id: 16, name: "Đồ truyền thống", url: "/thoi-trang-nu/do-truyen-thong" },
            { id: 17, name: "Đồ hóa trang", url: "/thoi-trang-nu/do-hoa-trang" },
            { id: 18, name: "Vải", url: "/thoi-trang-nu/vai" },
            { id: 19, name: "Vớ/ Tất", url: "/thoi-trang-nu/vo-tat" },
            { id: 20, name: "Khác", url: "/thoi-trang-nu/khac" },
        ],
        "Thời trang Trẻ Em" : [
            { id: 1, name: "Trang phục bé trai", url: "/thoi-trang-tre-em/trang-phuc-be-trai" },
            { id: 2, name: "Trang phục bé gái", url: "/thoi-trang-tre-em/trang-phuc-be-gai" },
            { id: 3, name: "Giày dép bé trai", url: "/thoi-trang-tre-em/giay-dep-be-trai" },
            { id: 4, name: "Giày dép bé gái", url: "/thoi-trang-tre-em/giay-dep-be-gai" },
            { id: 5, name: "Khác", url: "/thoi-trang-tre-em/khac" },
            { id: 6, name: "Quần áo em bé", url: "/thoi-trang-tre-em/quan-ao-em-be" },
            { id: 7, name: "Giày tập đi & Tất sơ sinh", url: "/thoi-trang-tre-em/giay-tap-di-va-tat-so-sinh" },
            { id: 8, name: "Phụ kiện trẻ em", url: "/thoi-trang-tre-em/phu-kien-tre-em" }
        ],
        "Túi Ví Nữ" : [
            { id: 1, name: "Ba Lô Nữ", url: "/tui-vi-nu/ba-lo-nu" },
            { id: 2, name: "Cặp Laptop", url: "/tui-vi-nu/cap-laptop" },
            { id: 3, name: "Ví Dự Tiệc & Ví Cầm Tay", url: "/tui-vi-nu/vi-du-tiec-va-vi-cam-tay" },
            { id: 4, name: "Túi Đeo Hông & Túi Đeo Ngực", url: "/tui-vi-nu/tui-deo-hong-va-tui-deo-nguc" },
            { id: 5, name: "Túi Tote", url: "/tui-vi-nu/tui-tote" },
            { id: 6, name: "Túi Quai Xách", url: "/tui-vi-nu/tui-quai-xach" },
            { id: 7, name: "Túi Đeo Chéo & Túi Đeo Vai", url: "/tui-vi-nu/tui-deo-cheo-va-tui-deo-vai" },
            { id: 8, name: "Ví/Bóp Nữ", url: "/tui-vi-nu/vi-bop-nu" },
            { id: 9, name: "Phụ Kiện Túi", url: "/tui-vi-nu/phu-kien-tui" },
            { id: 10, name: "Khác", url: "/tui-vi-nu/khac" },
        ],
    },
    V : {
        "Voucher & Dịch Vụ" : [
            { id: 1, name: "Nhà hàng & Ăn uống", url: "/voucher-dich-vu/nha-hang-an-uong" },
            { id: 2, name: "Sự kiện & Giải trí", url: "/voucher-dich-vu/su-kien-giai-tri" },
            { id: 3, name: "Nạp tiền tài khoản", url: "/voucher-dich-vu/nap-tien-tai-khoan" },
            { id: 4, name: "Sức khỏe & Làm đẹp", url: "/voucher-dich-vu/suc-khoe-lam-dep" },
            { id: 5, name: "Gọi xe", url: "/voucher-dich-vu/goi-xe" },
            { id: 6, name: "Khóa học", url: "/voucher-dich-vu/khoa-hoc" },
            { id: 7, name: "Du lịch & Khách sạn", url: "/voucher-dich-vu/du-lich-khach-san" },
            { id: 8, name: "Mua sắm", url: "/voucher-dich-vu/mua-sam" },
            { id: 9, name: "Mã quà tặng Shopee", url: "/voucher-dich-vu/ma-qua-tang-shopee" },
            { id: 10, name: "Thanh toán hóa đơn", url: "/voucher-dich-vu/thanh-toan-hoa-don" },
            { id: 11, name: "Dịch vụ khác", url: "/voucher-dich-vu/dich-vu-khac" },
            { id: 12, name: "Khác", url: "/voucher-dich-vu/khac" }
        ]

    }
}