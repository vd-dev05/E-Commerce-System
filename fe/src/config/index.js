import { assets } from "@/assets/assets";

export const initialOptionsPayPal = {
    clientId: import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID ,
    components: 'buttons'
    // Add other options as needed
};


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
        path: "/manager/login"
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
    { id: 1, label: "thời trang nam", url: assets.men, path: "Thời Trang Nam" },
    { id: 2, label: "thời trang nữ", url: assets.women, path: "Thời Trang Nữ" },
    { id: 3, label: "giày dép nam", url: assets.shoes, path: "Giày Dép Nam" },
    { id: 4, label: "đồng hồ", url: assets.clock, path: "Đồng Hồ" },
    { id: 5, label: "thiết bị da dụng", url: assets.appliances, path: "Thiết Bị Điện Gia Dụng" },
    { id: 6, label: "điện thoại", url: assets.phone, path: "Điện Thoại Phụ Kiện" },
    { id: 7, label: "ba lô nam,túi ví nam", url: assets.balo_tuvinam, path: "Balo Túi Ví Nam" },
    {id : 8 , label : "bách hóa online", url : assets.bach_hoa_online , path : "Bách Hóa Online"},
    {id : 9 , label : "giày dep nữ", url : assets.giay_dep_nu , path : "Giayas Dep Nữ"},
    {id : 10 , label : "oto, xe may, xe đạp", url : assets.car_motobike , path : "Oto, Xe May, Xế Dập"},
    {id : 11 , label : "sức khỏe", url : assets.suc_khoe , path : "Sức Khỏe"},
    {id : 12 , label : "sắc đẹp" , url : assets.sac_dep , path : "Sắc Đẹp"},
    {id : 13 , label : "máy ảnh &quay phim", url : assets.may_anh , path : "Máy ảnh & Thiết Bị Quay Phim"},
    {id : 14 , label : "mé & bé", url : assets.me_va_be , path : "Mé & Bé"},
    {id : 15 , label : "túi ví nữ", url : assets.tui_vi_nu , path : "Túi Ví Nữ"},
    {id : 16 , label : "nhà sách online", url : assets.nha_sach,path : "Nhà sách online"},
    {id : 17 , label : "thời trang trẻ em",url : assets.thoi_trang_tre_em , path : "Thời Trang Trẻ Em"},
    {id : 18 , label : "phụ kiện nữ" , url : assets.phu_kien_nu,path : "Phụ Kiện Nữ"},
    {id : 19 , label : "thể thao & du lịch", url : assets.the_thao , path : "Thể thao và du lich"},
    {id : 20 , label : "Voucher" ,url : assets.voucher, path : "Voucher"}
]

export const allcategory = {
    // api , data shoppe clone 
    B: {
        "Balo Túi Ví Nam": [
            { id: 1, name: "Ba lô nam", path: "ba-lo-nam", query: "ba-lo-nam", url: "/Balo Túi Ví Nam" },
            { id: 2, name: "Ba Lô Laptop Nam", query: "ba-lo-laptop-nam", path: "ba-lo-laptop-nam", url: "/Balo Túi Ví Nam" },
            { id: 3, name: "Túi & Cặp Đựng Laptop", query: "tui-cap-dung-laptop", path: "tui-cap-dung-laptop", url: "/Balo Túi Ví Nam" },
            { id: 4, name: "Túi Chống Sốc Laptop Nam", query: "tui-chong-soc-laptop-nam", path: "tui-chong-soc-laptop-nam", url: "/Balo Túi Ví Nam" },
            { id: 5, name: "Túi Tote Nam", query: "tui-tote-nam", path: "tui-tote-nam", url: "/Balo Túi Ví Nam" },
            { id: 6, name: "Cặp Xách Công Sở Nam", query: "cap-xach-cong-so-nam", path: "cap-xach-cong-so-nam", url: "/Balo Túi Ví Nam" },
            { id: 7, name: "Ví Cầm Tay Nam", query: "vi-cam-tay-nam", path: "vi-cam-tay-nam", url: "/Balo Túi Ví Nam" },
            { id: 8, name: "Túi Đeo Hông & Túi Đeo Ngực Nam", query: "tui-deo-hong-tui-deo-nguc-nam", path: "tui-deo-hong-tui-deo-nguc-nam", url: "/Balo Túi Ví Nam" },
            { id: 9, name: "Túi Đeo Chéo Nam", query: "tui-deo-cheo-nam", path: "tui-deo-cheo-nam", url: "/Balo Túi Ví Nam" },
            { id: 10, name: "Bóp/Ví Nam", query: "bop-vi-nam", path: "bop-vi-nam", url: "/Balo Túi Ví Nam" },
            { id: 11, name: "Khác", query: "khac", path: "khac", url: "/Balo Túi Ví Nam" }
        ]
    },
    D: {
        "Điện Thoại Phụ Kiện": [
            { id: 1, name: "Điện Thoại", path: "dien-thoai", query: "dien-thoai", url: "/Điện THoại Phụ Kiện" },
            { id: 2, name: "Máy tính bảng", path: "may-tinh-bang", query: "may-tinh-bang", url: "/Điện THoại Phụ Kiện" },
            { id: 3, name: "Pin Dự Phòng", path: "pin-du-phong", query: "pin-du-phong", url: "/Điện THoại Phụ Kiện" },
            { id: 4, name: "Pin Gắn Trong, Cáp và Bộ Sạc", path: "pin-gan-trong-cap-va-bo-sac", query: "pin-gan-trong-cap-va-bo-sac", url: "/Điện THoại Phụ Kiện" },
            { id: 5, name: "Ốp lưng, bao da, Miếng dán điện thoại", path: "op-lung-bao-da-mieng-dan-dien-thoai", query: "op-lung-bao-da-mieng-dan-dien-thoai", url: "/Điện THoại Phụ Kiện" },
            { id: 6, name: "Bảo vệ màn hình", path: "bao-ve-man-hinh", query: "bao-ve-man-hinh", url: "/Điện THoại Phụ Kiện" },
            { id: 7, name: "Đế giữ điện thoại", path: "de-giu-dien-thoai", query: "de-giu-dien-thoai", url: "/Điện THoại Phụ Kiện" },
            { id: 8, name: "Thẻ nhớ", path: "the-nho", query: "the-nho", url: "/Điện THoại Phụ Kiện" },
            { id: 9, name: "Sim", path: "sim", query: "sim", url: "/Điện THoại Phụ Kiện" },
            { id: 10, name: "Phụ kiện khác", path: "phu-kien-khac", query: "phu-kien-khac", url: "/Điện THoại Phụ Kiện" },
            { id: 11, name: "Thiết bị khác", path: "thiet-bi-khac", query: "thiet-bi-khac", url: "/Điện THoại Phụ Kiện" }
        ],
        "Dung_Cu_Va_Thiet_Bi_Tien_Ich": [
            { id: 1, name: "Dụng cụ cầm tay", path: "dung-cu-cam-tay", query: "dung-cu-cam-tay", url: "/dung-cu-va-thiet-bi-tien-ich" },
            { id: 2, name: "Dụng cụ điện và thiết bị lớn", path: "dung-cu-dien-va-thiet-bi-lon", query: "dung-cu-dien-va-thiet-bi-lon", url: "/dung-cu-va-thiet-bi-tien-ich" },
            { id: 3, name: "Thiết bị mạch điện", path: "thiet-bi-mach-dien", query: "thiet-bi-mach-dien", url: "/dung-cu-va-thiet-bi-tien-ich" },
            { id: 4, name: "Vật liệu xây dựng", path: "vat-lieu-xay-dung", query: "vat-lieu-xay-dung", url: "/dung-cu-va-thiet-bi-tien-ich" },
            { id: 5, name: "Thiết bị và phụ kiện xây dựng", path: "thiet-bi-va-phu-kien-xay-dung", query: "thiet-bi-va-phu-kien-xay-dung", url: "/dung-cu-va-thiet-bi-tien-ich" },
            { id: 6, name: "Khác", path: "khac", query: "khac", url: "/dung-cu-va-thiet-bi-tien-ich" }
        ],
        "Do_Choi_So_Thich": [
            { id: 1, name: "Đồ chơi giải trí", path: "do-choi-giai-tri", query: "do-choi-giai-tri", url: "/do-choi-so-thich" },
            { id: 2, name: "Đồ chơi giáo dục", path: "do-choi-giao-duc", query: "do-choi-giao-duc", url: "/do-choi-so-thich" },
            { id: 3, name: "Đồ chơi cho trẻ sơ sinh & trẻ nhỏ", path: "do-choi-cho-tre-so-sinh-va-tre-nho", query: "do-choi-cho-tre-so-sinh-va-tre-nho", url: "/do-choi-so-thich" },
            { id: 4, name: "Đồ chơi vận động & ngoài trời", path: "do-choi-van-dong-va-ngoai-troi", query: "do-choi-van-dong-va-ngoai-troi", url: "/do-choi-so-thich" },
            { id: 5, name: "Búp bê & Đồ chơi nhồi bông", path: "bup-be-do-choi-nhoi-bong", query: "bup-be-do-choi-nhoi-bong", url: "/do-choi-so-thich" }
        ],
        "Đồng Hồ": [
            { id: 1, name: "Đồng Hồ Nam", path: "dong-ho-nam", query: "dong-ho-nam", url: "/dong-ho" },
            { id: 2, name: "Đồng Hồ Nữ", path: "dong-ho-nu", query: "dong-ho-nu", url: "/dong-ho" },
            { id: 3, name: "Bộ Đồng Hồ & Đồng Hồ Cặp", path: "bo-dong-ho-va-dong-ho-cap", query: "bo-dong-ho-va-dong-ho-cap", url: "/dong-ho" },
            { id: 4, name: "Đồng Hồ Trẻ Em", path: "dong-ho-tre-em", query: "dong-ho-tre-em", url: "/dong-ho" },
            { id: 5, name: "Phụ Kiện Đồng Hồ", path: "phu-kien-dong-ho", query: "phu-kien-dong-ho", url: "/dong-ho" },
            { id: 6, name: "Khác", path: "khac", query: "khac", url: "/dong-ho" }

        ]
    },
    C: {
        "Chăm_Sóc_Thú_Cưng": [
            { id: 1, name: "Phụ kiện cho thú cưng", path: "phu-kien-cho-thu-cung", query: "phu-kien-cho-thu-cung", url: "/Chăm Sóc Thú Cưng" },
            { id: 2, name: "Vệ sinh cho thú cưng", path: "ve-sinh-cho-thu-cung", query: "ve-sinh-cho-thu-cung", url: "/Chăm Sóc Thú Cưng" },
            { id: 3, name: "Quần áo thú cưng", path: "quan-ao-thu-cung", query: "quan-ao-thu-cung", url: "/Chăm Sóc Thú Cưng" },
            { id: 4, name: "Chăm sóc sức khỏe", path: "cham-soc-suc-khoe", query: "cham-soc-suc-khoe", url: "/Chăm Sóc Thú Cưng" },
            { id: 5, name: "Làm đẹp cho thú cưng", path: "lam-dep-cho-thu-cung", query: "lam-dep-cho-thu-cung", url: "/Chăm Sóc Thú Cưng" },
            { id: 6, name: "Khác", path: "khac", query: "khac", url: "/Chăm Sóc Thú Cưng" }
        ]
    },
    G: {
        "Giày Dép Nam": [
            { id: 1, name: "Bốt", path: "bot", query: "bot", url: "/giay-dep-nam" },
            { id: 2, name: "Giày Thể Thao/ Sneakers", path: "giay-the-thao-sneakers", query: "giay-the-thao-sneakers", url: "/giay-dep-nam" },
            { id: 3, name: "Giày Sục", path: "giay-suc", query: "giay-suc", url: "/giay-dep-nam" },
            { id: 4, name: "Giày Tây Lười", path: "giay-tay-luoi", query: "giay-tay-luoi", url: "/giay-dep-nam" },
            { id: 5, name: "Giày Oxfords & Giày Buộc Dây", path: "giay-oxfords-giay-buoc-day", query: "giay-oxfords-giay-buoc-day", url: "/giay-dep-nam" },
            { id: 6, name: "Xăng-đan và Dép", path: "xang-dan-va-dep", query: "xang-dan-va-dep", url: "/giay-dep-nam" },
            { id: 7, name: "Phụ kiện giày dép", path: "phu-kien-giay-dep", query: "phu-kien-giay-dep", url: "/giay-dep-nam" },
            { id: 8, name: "Khác", path: "khac", query: "khac", url: "/giay-dep-nam" }
        ],
        "Giày Dép Nữ": [
            { id: 1, name: "Bốt", path: "bot", query: "bot", url: "/giay-dep-nu" },
            { id: 2, name: "Giày Thể Thao/ Sneaker", path: "giay-the-thao-sneaker", query: "giay-the-thao-sneaker", url: "/giay-dep-nu" },
            { id: 3, name: "Giày Đế Bằng", path: "giay-de-bang", query: "giay-de-bang", url: "/giay-dep-nu" },
            { id: 4, name: "Giày Cao Gót", path: "giay-cao-got", query: "giay-cao-got", url: "/giay-dep-nu" },
            { id: 5, name: "Giày Đế Xuồng", path: "giay-de-xuong", query: "giay-de-xuong", url: "/giay-dep-nu" },
            { id: 6, name: "Xăng-đan Và Dép", path: "xang-dan-va-dep", query: "xang-dan-va-dep", url: "/giay-dep-nu" },
            { id: 7, name: "Phụ Kiện Giày", path: "phu-kien-giay", query: "phu-kien-giay", url: "/giay-dep-nu" },
            { id: 8, name: "Khác", path: "khac", query: "khac", url: "/giay-dep-nu" }
        ],
        "Giat_Giu_Cham_Soc_Nha_Cua": [
            { id: 1, name: "Giặt giũ & Chăm sóc nhà cửa", path: "giat-giu-cham-soc-nha-cua", query: "giat-giu-cham-soc-nha-cua", url: "/giat-giu-cham-soc-nha-cua" },
            { id: 2, name: "Giấy vệ sinh, khăn giấy", path: "giay-ve-sinh-khan-giay", query: "giay-ve-sinh-khan-giay", url: "/giat-giu-cham-soc-nha-cua" },
            { id: 3, name: "Vệ sinh nhà cửa", path: "ve-sinh-nha-cua", query: "ve-sinh-nha-cua", url: "/giat-giu-cham-soc-nha-cua" },
            { id: 4, name: "Vệ sinh bát đĩa", path: "ve-sinh-bat-dia", query: "ve-sinh-bat-dia", url: "/giat-giu-cham-soc-nha-cua" },
            { id: 5, name: "Dụng cụ vệ sinh", path: "dung-cu-ve-sinh", query: "dung-cu-ve-sinh", url: "/giat-giu-cham-soc-nha-cua" },
            { id: 6, name: "Chất khử mùi, làm thơm", path: "chat-khu-mui-lam-thom", query: "chat-khu-mui-lam-thom", url: "/giat-giu-cham-soc-nha-cua" },
            { id: 7, name: "Thuốc diệt côn trùng", path: "thuoc-diet-con-trung", query: "thuoc-diet-con-trung", url: "/giat-giu-cham-soc-nha-cua" },
            { id: 8, name: "Túi, màng bọc thực phẩm", path: "tui-mang-boc-thuc-pham", query: "tui-mang-boc-thuc-pham", url: "/giat-giu-cham-soc-nha-cua" },
            { id: 9, name: "Bao bì, túi đựng rác", path: "bao-bi-tui-dung-rac", query: "bao-bi-tui-dung-rac", url: "/giat-giu-cham-soc-nha-cua" }
        ]
    },
    M: {
        "May_Tinh_Laptop": [
            { id: 1, name: "Máy Tính Bàn", path: "may-tinh-ban", query: "may-tinh-ban", url: "/may-tinh-laptop" },
            { id: 2, name: "Màn Hình", path: "man-hinh", query: "man-hinh", url: "/may-tinh-laptop" },
            { id: 3, name: "Linh Kiện Máy Tính", path: "linh-kien-may-tinh", query: "linh-kien-may-tinh", url: "/may-tinh-laptop" },
            { id: 4, name: "Thiết Bị Lưu Trữ", path: "thiet-bi-luu-tru", query: "thiet-bi-luu-tru", url: "/may-tinh-laptop" },
            { id: 5, name: "Thiết Bị Mạng", path: "thiet-bi-mang", query: "thiet-bi-mang", url: "/may-tinh-laptop" },
            { id: 6, name: "Máy In, Máy Scan & Máy Chiếu", path: "may-in-may-scan-may-chieu", query: "may-in-may-scan-may-chieu", url: "/may-tinh-laptop" },
            { id: 7, name: "Phụ Kiện Máy Tính", path: "phu-kien-may-tinh", query: "phu-kien-may-tinh", url: "/may-tinh-laptop" },
            { id: 8, name: "Laptop", path: "laptop", query: "laptop", url: "/may-tinh-laptop" },
            { id: 9, name: "Khác", path: "khac", query: "khac", url: "/may-tinh-laptop" }
        ],
        "May_Anh_May_Quay_Phim": [
            { id: 1, name: "Máy ảnh - Máy quay phim", path: "may-anh-may-quay-phim", query: "may-anh-may-quay-phim", url: "/may-anh-may-quay-phim" },
            { id: 2, name: "Camera giám sát & Camera hệ thống", path: "camera-giam-sat-camera-he-thong", query: "camera-giam-sat-camera-he-thong", url: "/may-anh-may-quay-phim" },
            { id: 3, name: "Thẻ nhớ", path: "the-nho", query: "the-nho", url: "/may-anh-may-quay-phim" },
            { id: 4, name: "Ống kính", path: "ong-kinh", query: "ong-kinh", url: "/may-anh-may-quay-phim" },
            { id: 5, name: "Phụ kiện máy ảnh", path: "phu-kien-may-anh", query: "phu-kien-may-anh", url: "/may-anh-may-quay-phim" },
            { id: 6, name: "Máy bay camera & Phụ kiện", path: "may-bay-camera-phu-kien", query: "may-bay-camera-phu-kien", url: "/may-anh-may-quay-phim" }
        ],
        "Me_Be": [
            { id: 1, name: "Đồ dùng du lịch cho bé", path: "do-dung-du-lich-cho-be", query: "do-dung-du-lich-cho-be", url: "/me-be" },
            { id: 2, name: "Đồ dùng ăn dặm cho bé", path: "do-dung-an-dam-cho-be", query: "do-dung-an-dam-cho-be", url: "/me-be" },
            { id: 3, name: "Phụ kiện cho mẹ", path: "phu-kien-cho-me", query: "phu-kien-cho-me", url: "/me-be" },
            { id: 4, name: "Chăm sóc sức khỏe mẹ", path: "cham-soc-suc-khoe-me", query: "cham-soc-suc-khoe-me", url: "/me-be" },
            { id: 5, name: "Đồ dùng phòng tắm & Chăm sóc cơ thể bé", path: "do-dung-phong-tam-cham-soc-co-the-be", query: "do-dung-phong-tam-cham-soc-co-the-be", url: "/me-be" },
            { id: 6, name: "Đồ dùng phòng ngủ cho bé", path: "do-dung-phong-ngu-cho-be", query: "do-dung-phong-ngu-cho-be", url: "/me-be" },
            { id: 7, name: "An toàn cho bé", path: "an-toan-cho-be", query: "an-toan-cho-be", url: "/me-be" },
            { id: 8, name: "Thực phẩm cho bé", path: "thuc-pham-cho-be", query: "thuc-pham-cho-be", url: "/me-be" },
            { id: 9, name: "Chăm sóc sức khỏe bé", path: "cham-soc-suc-khoe-be", query: "cham-soc-suc-khoe-be", url: "/me-be" },
            { id: 10, name: "Tã & bô em bé", path: "ta-bo-em-be", query: "ta-bo-em-be", url: "/me-be" },
            { id: 11, name: "Đồ chơi", path: "do-choi", query: "do-choi", url: "/me-be" },
            { id: 12, name: "Bộ & Gói quà tặng", path: "bo-goi-qua-tang", query: "bo-goi-qua-tang", url: "/me-be" },
            { id: 13, name: "Sữa công thức trên 24 tháng", path: "sua-cong-thuc-tren-24-thang", query: "sua-cong-thuc-tren-24-thang", url: "/me-be" },
            { id: 14, name: "Sữa công thức 0-24 tháng tuổi", path: "sua-cong-thuc-0-24-thang-tuoi", query: "sua-cong-thuc-0-24-thang-tuoi", url: "/me-be" },
            { id: 15, name: "Khác", path: "khac", query: "khac", url: "/me-be" }
        ]
    },
    N: {
        "Nha_Cua_Doi_Song": [
            { id: 1, name: "Chăn, Ga, Gối & Nệm", path: "chan-ga-goi-nem", query: "chan-ga-goi-nem", url: "/nha-cua-doi-song" },
            { id: 2, name: "Đồ nội thất", path: "do-noi-that", query: "do-noi-that", url: "/nha-cua-doi-song" },
            { id: 3, name: "Trang trí nhà cửa", path: "trang-tri-nha-cua", query: "trang-tri-nha-cua", url: "/nha-cua-doi-song" },
            { id: 4, name: "Dụng cụ & Thiết bị tiện ích", path: "dung-cu-thiet-bi-tien-ich", query: "dung-cu-thiet-bi-tien-ich", url: "/nha-cua-doi-song" },
            { id: 5, name: "Chăm sóc sức khỏe", path: "cham-soc-suc-khoe", query: "cham-soc-suc-khoe", url: "/nha-cua-doi-song" },
            { id: 6, name: "Làm đẹp cho thú cưng", path: "lam-dep-cho-thu-cung", query: "lam-dep-cho-thu-cung", url: "/nha-cua-doi-song" },
            { id: 7, name: "Khác", path: "khac", query: "khac", url: "/nha-cua-doi-song" },
            { id: 8, name: "Đồ dùng nhà bếp và hộp đựng thực phẩm", path: "do-dung-nha-bep-va-hop-dung-thuc-pham", query: "do-dung-nha-bep-va-hop-dung-thuc-pham", url: "/nha-cua-doi-song" },
            { id: 9, name: "Đèn Ngoài trời & Sân vườn", path: "den-ngoai-troi-va-san-vuon", query: "den-ngoai-troi-va-san-vuon", url: "/nha-cua-doi-song" },
            { id: 10, name: "Đồ dùng phòng tắm", path: "do-dung-phong-tam", query: "do-dung-phong-tam", url: "/nha-cua-doi-song" },
            { id: 11, name: "Vật phẩm thờ cúng", path: "vat-pham-tho-cung", query: "vat-pham-tho-cung", url: "/nha-cua-doi-song" },
            { id: 12, name: "Đồ trang trí tiệc", path: "do-trang-tri-tiec", query: "do-trang-tri-tiec", url: "/nha-cua-doi-song" },
            { id: 13, name: "Chăm sóc nhà cửa và giặt ủi", path: "cham-soc-nha-cua-va-giat-ui", query: "cham-soc-nha-cua-va-giat-ui", url: "/nha-cua-doi-song" },
            { id: 14, name: "Sắp xếp nhà cửa", path: "sap-xep-nha-cua", query: "sap-xep-nha-cua", url: "/nha-cua-doi-song" },
            { id: 15, name: "Dụng cụ pha chế", path: "dung-cu-pha-che", query: "dung-cu-pha-che", url: "/nha-cua-doi-song" },
            { id: 16, name: "Tinh dầu thơm phòng", path: "tinh-dau-thom-phong", query: "tinh-dau-thom-phong", url: "/nha-cua-doi-song" },
            { id: 17, name: "Đồ dùng phòng ăn", path: "do-dung-phong-an", query: "do-dung-phong-an", url: "/nha-cua-doi-song" },
            { id: 18, name: "Nhà Sách Online", path: "nha-sach-online", query: "nha-sach-online", url: "/nha-cua-doi-song" },
            { id: 19, name: "Sách Tiếng Việt", path: "sach-tieng-viet", query: "sach-tieng-viet", url: "/nha-cua-doi-song" },
            { id: 20, name: "Sách ngoại văn", path: "sach-ngoai-van", query: "sach-ngoai-van", url: "/nha-cua-doi-song" },
            { id: 21, name: "Gói Quà", path: "goi-qua", query: "goi-qua", url: "/nha-cua-doi-song" },
            { id: 22, name: "Bút viết", path: "but-viet", query: "but-viet", url: "/nha-cua-doi-song" },
            { id: 23, name: "Dụng cụ học sinh & văn phòng", path: "dung-cu-hoc-sinh-va-van-phong", query: "dung-cu-hoc-sinh-va-van-phong", url: "/nha-cua-doi-song" },
            { id: 24, name: "Màu, Họa Cụ và Đồ Thủ Công", path: "mau-hoa-cu-va-do-thu-cong", query: "mau-hoa-cu-va-do-thu-cong", url: "/nha-cua-doi-song" },
            { id: 25, name: "Sổ và Giấy", path: "so-va-giay", query: "so-va-giay", url: "/nha-cua-doi-song" },
            { id: 26, name: "Các Loại Quà Lưu Niệm", path: "cac-loai-qua-luu-niem", query: "cac-loai-qua-luu-niem", url: "/nha-cua-doi-song" },
            { id: 27, name: "Nhạc cụ và phụ kiện âm nhạc", path: "nhac-cu-va-phu-kien-am-nhac", query: "nhac-cu-va-phu-kien-am-nhac", url: "/nha-cua-doi-song" },
            { id: 28, name: "Khác", path: "khac", query: "khac", url: "/nha-cua-doi-song" }
        ],},
        T: {
            "Thiết Bị Điện Gia Dụng": [
                { id: 1, name: 'do gia dung nha bep', path: 'do-gia-dung-nha-bep', query: 'do-gia-dung-nha-bep', url: '/thiet-bi-dien-gia-dung' },
                { id: 2, name: 'do gia dung lon', path: 'do-gia-dung-lon', query: 'do-gia-dung-lon', url: '/thiet-bi-dien-gia-dung' },
                { id: 3, name: 'may hut bui & thiet bi lam sach', path: 'may-hut-bui-va-thiet-bi-lam-sach', query: 'may-hut-bui-va-thiet-bi-lam-sach', url: '/thiet-bi-dien-gia-dung' },
                { id: 4, name: 'quat & may nong lanh', path: 'quat-va-may-nong-lanh', query: 'quat-va-may-nong-lanh', url: '/thiet-bi-dien-gia-dung' },
                { id: 5, name: 'thiet bi cham soc quan ao', path: 'thiet-bi-cham-soc-quan-ao', query: 'thiet-bi-cham-soc-quan-ao', url: '/thiet-bi-dien-gia-dung' },
                { id: 6, name: 'khac', path: 'khac', query: 'khac', url: '/thiet-bi-dien-gia-dung' }
            ],
            "Thiết Bị Điện Tử": [
                { id: 1, name: 'thiet bi deo thong minh', path: 'thiet-bi-deo-thong-minh', query: 'thiet-bi-deo-thong-minh', url: '/thiet-bi-dien-tu' },
                { id: 2, name: 'phu kien tivi', path: 'phu-kien-tivi', query: 'phu-kien-tivi', url: '/thiet-bi-dien-tu' },
                { id: 3, name: 'may game console', path: 'may-game-console', query: 'may-game-console', url: '/thiet-bi-dien-tu' },
                { id: 4, name: 'phu kien console', path: 'phu-kien-console', query: 'phu-kien-console', url: '/thiet-bi-dien-tu' },
                { id: 5, name: 'dia game', path: 'dia-game', query: 'dia-game', url: '/thiet-bi-dien-tu' },
                { id: 6, name: 'linh phu kien', path: 'linh-phu-kien', query: 'linh-phu-kien', url: '/thiet-bi-dien-tu' },
                { id: 7, name: 'tai nghe nhet tai', path: 'tai-nghe-nhet-tai', query: 'tai-nghe-nhet-tai', url: '/thiet-bi-dien-tu' },
                { id: 8, name: 'loa', path: 'loa', query: 'loa', url: '/thiet-bi-dien-tu' },
                { id: 9, name: 'tivi', path: 'tivi', query: 'tivi', url: '/thiet-bi-dien-tu' },
                { id: 10, name: 'tivi box', path: 'tivi-box', query: 'tivi-box', url: '/thiet-bi-dien-tu' },
                { id: 11, name: 'headphones', path: 'headphones', query: 'headphones', url: '/thiet-bi-dien-tu' }
            ],
            "Thể Thao & Du Lịch": [
                { id: 1, name: 'vali tui du lich', path: 'vali-tui-du-lich', query: 'vali-tui-du-lich', url: '/the-thao-du-lich' },
                { id: 2, name: 'phu kien du lich', path: 'phu-kien-du-lich', query: 'phu-kien-du-lich', url: '/the-thao-du-lich' },
                { id: 3, name: 'dung cu the thao & da ngoai', path: 'dung-cu-the-thao-va-da-ngoai', query: 'dung-cu-the-thao-va-da-ngoai', url: '/the-thao-du-lich' },
                { id: 4, name: 'giay the thao', path: 'giay-the-thao', query: 'giay-the-thao', url: '/the-thao-du-lich' },
                { id: 5, name: 'thoi trang the thao & da ngoai', path: 'thoi-trang-the-thao-va-da-ngoai', query: 'thoi-trang-the-thao-va-da-ngoai', url: '/the-thao-du-lich' },
                { id: 6, name: 'phu kien the thao & da ngoai', path: 'phu-kien-the-thao-va-da-ngoai', query: 'phu-kien-the-thao-va-da-ngoai', url: '/the-thao-du-lich' },
                { id: 7, name: 'khac', path: 'khac', query: 'khac', url: '/the-thao-du-lich' }
            ],
            "Thời Trang Nam": [
                { id: 1, name: 'ao khoac', path: 'ao-khoac', query: 'ao-khoac', url: '/thoi-trang-nam' },
                { id: 2, name: 'ao vest va blazer', path: 'ao-vest-va-blazer', query: 'ao-vest-va-blazer', url: '/thoi-trang-nam' },
                { id: 3, name: 'ao hoodie', path: 'ao-hoodie', query: 'ao-hoodie', url: '/thoi-trang-nam' },
                { id: 4, name: 'ao len & ao ni', path: 'ao-len-va-ao-ni', query: 'ao-len-va-ao-ni', url: '/thoi-trang-nam' },
                { id: 5, name: 'quan jeans', path: 'quan-jeans', query: 'quan-jeans', url: '/thoi-trang-nam' },
                { id: 6, name: 'quan dai/quan au', path: 'quan-dai-quan-au', query: 'quan-dai-quan-au', url: '/thoi-trang-nam' },
                { id: 7, name: 'quan short', path: 'quan-short', query: 'quan-short', url: '/thoi-trang-nam' },
                { id: 8, name: 'ao ao ba lo', path: 'ao-ao-ba-lo', query: 'ao-ao-ba-lo', url: '/thoi-trang-nam' },
                { id: 9, name: 'do lot', path: 'do-lot', query: 'do-lot', url: '/thoi-trang-nam' },
                { id: 10, name: 'do ngu', path: 'do-ngu', query: 'do-ngu', url: '/thoi-trang-nam' },
                { id: 11, name: 'do bo', path: 'do-bo', query: 'do-bo', url: '/thoi-trang-nam' },
                { id: 12, name: 'vo/tat', path: 'vo-tat', query: 'vo-tat', url: '/thoi-trang-nam' },
                { id: 13, name: 'trang phuc truyen thong', path: 'trang-phuc-truyen-thong', query: 'trang-phuc-truyen-thong', url: '/thoi-trang-nam' },
                { id: 14, name: 'do hoa trang', path: 'do-hoa-trang', query: 'do-hoa-trang', url: '/thoi-trang-nam' },
                { id: 15, name: 'trang phuc nganh nghe', path: 'trang-phuc-nganh-nghe', query: 'trang-phuc-nganh-nghe', url: '/thoi-trang-nam' },
                { id: 16, name: 'khac', path: 'khac', query: 'khac', url: '/thoi-trang-nam' },
                { id: 17, name: 'kinh mat nam', path: 'kinh-mat-nam', query: 'kinh-mat-nam', url: '/thoi-trang-nam' },
                { id: 18, name: 'that lung nam', path: 'that-lung-nam', query: 'that-lung-nam', url: '/thoi-trang-nam' },
                { id: 19, name: 'ca vat & no co', path: 'ca-vat-va-no-co', query: 'ca-vat-va-no-co', url: '/thoi-trang-nam' },
                { id: 20, name: 'phu kien nam', path: 'phu-kien-nam', query: 'phu-kien-nam', url: '/thoi-trang-nam' }
            ],
            "Thời Trang Nữ": [
                { id: 1, path: "quan", name: "Quần", url: "/thoi-trang-nu", query: "quan" },
                { id: 2, path: "quan-dui", name: "Quần đùi", url: "/thoi-trang-nu", query: "quan-dui" },
                { id: 3, path: "chan-vay", name: "Chân váy", url: "/thoi-trang-nu", query: "chan-vay" },
                { id: 4, path: "quan-jeans", name: "Quần jeans", url: "/thoi-trang-nu", query: "quan-jeans" },
                { id: 5, path: "dam-vay", name: "Đầm/Váy", url: "/thoi-trang-nu", query: "dam-vay" },
                { id: 6, path: "vay-cuoi", name: "Váy cưới", url: "/thoi-trang-nu", query: "vay-cuoi" },
                { id: 7, path: "ao-khoac-ao-choang-va-vest", name: "Áo khoác, Áo choàng & Vest", url: "/thoi-trang-nu", query: "ao-khoac-ao-choang-va-vest" },
                { id: 8, path: "ao-len-va-cardigan", name: "Áo len & Cardigan", url: "/thoi-trang-nu", query: "ao-len-va-cardigan" },
                { id: 9, path: "hoodie-va-ao-ni", name: "Hoodie và Áo nỉ", url: "/thoi-trang-nu", query: "hoodie-va-ao-ni" },
                { id: 10, path: "bo", name: "Bộ", url: "/thoi-trang-nu", query: "bo" },
                { id: 11, path: "do-lot", name: "Đồ lót", url: "/thoi-trang-nu", query: "do-lot" },
                { id: 12, path: "do-ngu", name: "Đồ ngủ", url: "/thoi-trang-nu", query: "do-ngu" },
                { id: 13, path: "ao", name: "Áo", url: "/thoi-trang-nu", query: "ao" },
                { id: 14, path: "do-tap", name: "Đồ tập", url: "/thoi-trang-nu", query: "do-tap" },
                { id: 15, path: "do-bau", name: "Đồ Bầu", url: "/thoi-trang-nu", query: "do-bau" },
                { id: 16, path: "do-truyen-thong", name: "Đồ truyền thống", url: "/thoi-trang-nu", query: "do-truyen-thong" },
                { id: 17, path: "do-hoa-trang", name: "Đồ hóa trang", url: "/thoi-trang-nu", query: "do-hoa-trang" },
                { id: 18, path: "vai", name: "Vải", url: "/thoi-trang-nu", query: "vai" },
                { id: 19, path: "vo-tat", name: "Vớ/ Tất", url: "/thoi-trang-nu", query: "vo-tat" },
                { id: 20, path: "khac", name: "Khác", url: "/thoi-trang-nu", query: "khac" },
            ],
            "Thời trang Trẻ Em": [
                { id: 1, path: "trang-phuc-be-trai", name: "Trang phục bé trai", url: "/thoi-trang-tre-em", query: "trang-phuc-be-trai" },
                { id: 2, path: "trang-phuc-be-gai", name: "Trang phục bé gái", url: "/thoi-trang-tre-em", query: "trang-phuc-be-gai" },
                { id: 3, path: "giay-dep-be-trai", name: "Giày dép bé trai", url: "/thoi-trang-tre-em", query: "giay-dep-be-trai" },
                { id: 4, path: "giay-dep-be-gai", name: "Giày dép bé gái", url: "/thoi-trang-tre-em", query: "giay-dep-be-gai" },
                { id: 5, path: "khac", name: "Khác", url: "/thoi-trang-tre-em", query: "khac" },
                { id: 6, path: "quan-ao-em-be", name: "Quần áo em bé", url: "/thoi-trang-tre-em", query: "quan-ao-em-be" },
                { id: 7, path: "giay-tap-di-va-tat-so-sinh", name: "Giày tập đi & Tất sơ sinh", url: "/thoi-trang-tre-em", query: "giay-tap-di-va-tat-so-sinh" },
                { id: 8, path: "phu-kien-tre-em", name: "Phụ kiện trẻ em", url: "/thoi-trang-tre-em", query: "phu-kien-tre-em" }
            ],
            "Túi Ví Nữ": [
                { id: 1, path: "ba-lo-nu", name: "Ba Lô Nữ", url: "/tui-vi-nu", query: "ba-lo-nu" },
                { id: 2, path: "cap-laptop", name: "Cặp Laptop", url: "/tui-vi-nu", query: "cap-laptop" },
                { id: 3, path: "vi-du-tiec-va-vi-cam-tay", name: "Ví Dự Tiệc & Ví Cầm Tay", url: "/tui-vi-nu", query: "vi-du-tiec-va-vi-cam-tay" },
                { id: 4, path: "tui-deo-hong-va-tui-deo-nguc", name: "Túi Đeo Hông & Túi Đeo Ngực", url: "/tui-vi-nu", query: "tui-deo-hong-va-tui-deo-nguc" },
                { id: 5, path: "tui-tote", name: "Túi Tote", url: "/tui-vi-nu", query: "tui-tote" },
                { id: 6, path: "tui-quai-xach", name: "Túi Quai Xách", url: "/tui-vi-nu", query: "tui-quai-xach" },
                { id: 7, path: "tui-deo-cheo-va-tui-deo-vai", name: "Túi Đeo Chéo & Túi Đeo Vai", url: "/tui-vi-nu", query: "tui-deo-cheo-va-tui-deo-vai" },
                { id: 8, path: "vi-bop-nu", name: "Ví/Bóp Nữ", url: "/tui-vi-nu", query: "vi-bop-nu" },
                { id: 9, path: "phu-kien-tui", name: "Phụ Kiện Túi", url: "/tui-vi-nu", query: "phu-kien-tui" },
                { id: 10, path: "khac", name: "Khác", url: "/tui-vi-nu", query: "khac" },
            ],
        },
        V: {
            "Voucher & Dịch Vụ": [
                { id: 1, name: "Nhà hàng & Ăn uống", path: "nha-hang-an-uong", query: "nha-hang-an-uong", url: "/voucher-dich-vu" },
                { id: 2, name: "Sự kiện & Giải trí", path: "su-kien-giai-tri", query: "su-kien-giai-tri", url: "/voucher-dich-vu" },
                { id: 3, name: "Nạp tiền tài khoản", path: "nap-tien-tai-khoan", query: "nap-tien-tai-khoan", url: "/voucher-dich-vu" },
                { id: 4, name: "Sức khỏe & Làm đẹp", path: "suc-khoe-lam-dep", query: "suc-khoe-lam-dep", url: "/voucher-dich-vu" },
                { id: 5, name: "Gọi xe", path: "goi-xe", query: "goi-xe", url: "/voucher-dich-vu" },
                { id: 6, name: "Khóa học", path: "khoa-hoc", query: "khoa-hoc", url: "/voucher-dich-vu" },
                { id: 7, name: "Du lịch & Khách sạn", path: "du-lich-khach-san", query: "du-lich-khach-san", url: "/voucher-dich-vu" },
                { id: 8, name: "Mua sắm", path: "mua-sam", query: "mua-sam", url: "/voucher-dich-vu" },
                { id: 9, name: "Mã quà tặng Shopee", path: "ma-qua-tang-shopee", query: "ma-qua-tang-shopee", url: "/voucher-dich-vu" },
                { id: 10, name: "Thanh toán hóa đơn", path: "thanh-toan-hoa-don", query: "thanh-toan-hoa-don", url: "/voucher-dich-vu" },
                { id: 11, name: "Dịch vụ khác", path: "dich-vu-khac", query: "dich-vu-khac", url: "/voucher-dich-vu" },
                { id: 12, name: "Khác", path: "khac", query: "khac", url: "/voucher-dich-vu" }
            ]
        }
    }

export const categoryMapping = {
    "Balo Túi Ví Nam"  : "B",
    "Điện Thoại Phụ Kiện" : "D",
    "Điện Thoại Phụ Kiện" : "D",
    "Bách Hóa Online" : "B",
    "Chăm Sóc Thú Cưng" : "C",
    "Dụng Cụ Và Thiết Bị Tiện Ích" : "D",
    'Đồng Hồ': 'D',
    "do-choi-so-thich-su-tam Đồ Chơi Sở Thích Sưu Tầm" : "G",
    "Giày Dép Nam" : "G",
    "giay-dep-nu" : "G",
    "gia-tien-va-cham-soc-nha-cua" : "G",
    "may-tinh-laptop" : "M",
    "me-va-be" : "M",
    "nha-cua-va-doi-song" : "N",
    "nhac-cu-va-phu-kien-am-nhac" : "O",
    "phu-kien-va-trang-suc-nu" : "P",
    "sac-dep" : "S",
    "Thiết Bị Điện Gia Dụng" : "T",
    "Thời Trang Nam" : "T",
    "Thời Trang Nữ" : "T",
    "Thời Trang Trẻ Em" : "T",
    "tui-vi-nu" : "V",
    "voucher-va-dich-vu" : "V"
}
