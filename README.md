# E-Commerce-System

soucre public
E-Com-project/

├─ .gitignore
├─ be/
│  ├─ .babelrc
│  ├─ .env
│  ├─ .env.example
│  ├─ .gitignore
│  ├─ config/
│  │  ├─ cloudinary.js
│  │  ├─ cloundAvartar.js
│  │  ├─ index.js
│  │  └─ mongodb.js
│  ├─ controllers/
│  │  ├─ admin/
│  │  │  ├─ adminController.js
│  │  │  └─ voucher/
│  │  │     └─ index.js
│  │  ├─ manager/
│  │  │  ├─ auth/
│  │  │  │  └─ managerController.js
│  │  │  └─ products/
│  │  │     ├─ categoryController.js
│  │  │     ├─ productController.js
│  │  │     └─ voucherController.js
│  │  └─ user/
│  │     ├─ address/
│  │     │  └─ index.js
│  │     ├─ auth/
│  │     │  └─ authController.js
│  │     ├─ block/
│  │     │  └─ index.js
│  │     ├─ card/
│  │     │  ├─ cartControllers.js
│  │     │  └─ orderControllers.js
│  │     ├─ chat/
│  │     │  └─ index.js
│  │     ├─ comment/
│  │     │  └─ index.js
│  │     ├─ countdown/
│  │     │  └─ index.js
│  │     ├─ edit/
│  │     │  ├─ avartar.js
│  │     │  ├─ password.js
│  │     │  └─ profile.js
│  │     ├─ favorite/
│  │     │  └─ index.js
│  │     ├─ products/
│  │     │  └─ products.js
│  │     ├─ recommend/
│  │     │  └─ index.js
│  │     ├─ searchHistory/
│  │     │  └─ index.js
│  │     ├─ topSearch/
│  │     │  └─ index.js
│  │     ├─ transition/
│  │     │  └─ index.js
│  │     └─ voucher/
│  │        └─ index.js
│  ├─ error/
│  │  ├─ admin/
│  │  │  └─ adminError.js
│  │  ├─ errorResponse.js
│  │  ├─ manager/
│  │  │  └─ managerError.js
│  │  └─ user/
│  │     └─ userError.js
│  ├─ index.js
│  ├─ middlewares/
│  │  ├─ admin/
│  │  │  └─ adminMiddleware.js
│  │  ├─ authMiddleware.js
│  │  └─ user/
│  ├─ models/
│  │  ├─ admin/
│  │  │  └─ voucherModels.js
│  │  ├─ auth/
│  │  │  └─ userModel.js
│  │  └─ shop/
│  │     ├─ addressModel.js
│  │     ├─ cartModel.js
│  │     ├─ categoryModel.js
│  │     ├─ chatModel.js
│  │     ├─ commentModel.js
│  │     ├─ managerModel.js
│  │     ├─ notificationModel.js
│  │     ├─ orderModels.js
│  │     ├─ productModel.js
│  │     ├─ ratingModel.js
│  │     ├─ searchModel.js
│  │     └─ transitionModels.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes/
│  │  ├─ index.js
│  │  └─ ver1/
│  │     ├─ admin/
│  │     │  └─ adminRoutes.js
│  │     ├─ auth/
│  │     │  └─ authRoutes.js
│  │     ├─ manager/
│  │     │  └─ managerRoutes.js
│  │     └─ user/
│  │        └─ userRoutes.js
│  ├─ services/
│  │  ├─ chatService.js
│  │  ├─ configStatus.js
│  │  ├─ countdownService.js
│  │  └─ paypal.js
│  ├─ socket/
│  └─ socket.js
├─ fe/
│  ├─ .env
│  ├─ .env.example
│  ├─ .gitignore
│  ├─ .netlify/
│  │  ├─ functions-internal/
│  │  ├─ state.json
│  │  └─ v1/
│  │     └─ functions/
│  ├─ components.json
│  ├─ dist/
│  │  ├─ assets/
│  │  │  ├─ ao_nu-BBqTrAck.jpg
│  │  │  ├─ banner-1-BD2W0pP8.webp
│  │  │  ├─ banner-2-BDIEALA1.webp
│  │  │  ├─ banner-3-BoSvFwNy.webp
│  │  │  ├─ banner-register-D3d7BbxM.png
│  │  │  ├─ banner_1-UvewHDfh.png
│  │  │  ├─ da_dung-CubBG1Zd.jpg
│  │  │  ├─ dien_thoai-BxwUL-JV.jpg
│  │  │  ├─ dong_ho_deo_tay-FgrFPeR3.jpg
│  │  │  ├─ index-DeGk1pMB.css
│  │  │  ├─ index-uA7LwZAX.js
│  │  │  ├─ manager_login-BhhKw2fK.png
│  │  │  ├─ mbbanner-BJa6J66R.jpg
│  │  │  ├─ soppejpg-D9qy5uT8.jpg
│  │  │  └─ vendor-CJWpz0ZN.js
│  │  ├─ index.html
│  │  └─ vite.svg
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ jsconfig.json
│  ├─ netlify.toml
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ public/
│  │  └─ vite.svg
│  ├─ README.md
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ assets/
│  │  │  ├─ ao_nam.jpg
│  │  │  ├─ ao_nu.jpg
│  │  │  ├─ assets.js
│  │  │  ├─ banner-1.webp
│  │  │  ├─ banner-2.webp
│  │  │  ├─ banner-3.webp
│  │  │  ├─ banner-register.png
│  │  │  ├─ banner_1.png
│  │  │  ├─ cart_icon.png
│  │  │  ├─ da_dung.jpg
│  │  │  ├─ dien_thoai.jpg
│  │  │  ├─ dong_ho_deo_tay.jpg
│  │  │  ├─ giay.jpg
│  │  │  ├─ manager_login.png
│  │  │  ├─ mbbanner.jpg
│  │  │  ├─ mocEcom.json
│  │  │  ├─ search_icon.png
│  │  │  ├─ soppejpg.jpg
│  │  │  ├─ svg/
│  │  │  │  └─ notification.jsx
│  │  │  ├─ tải xuống.jpg
│  │  │  └─ upload_area.png
│  │  ├─ components/
│  │  │  ├─ admin/
│  │  │  │  ├─ navBar.jsx
│  │  │  │  └─ ui/
│  │  │  │     ├─ SaleUser.jsx
│  │  │  │     ├─ VoucherAllUser.jsx
│  │  │  │     ├─ VoucherCreate.jsx
│  │  │  │     └─ VouchereditUser.jsx
│  │  │  ├─ manager/
│  │  │  │  ├─ header.jsx
│  │  │  │  ├─ image.jsx
│  │  │  │  ├─ menu.jsx
│  │  │  │  ├─ product-card.jsx
│  │  │  │  ├─ product-detail.jsx
│  │  │  │  └─ sidebar.jsx
│  │  │  ├─ shop/
│  │  │  │  ├─ avartar/
│  │  │  │  │  └─ index.jsx
│  │  │  │  ├─ cart/
│  │  │  │  │  └─ index.jsx
│  │  │  │  ├─ chat/
│  │  │  │  │  ├─ details.jsx
│  │  │  │  │  └─ index.jsx
│  │  │  │  ├─ comment/
│  │  │  │  │  └─ index.jsx
│  │  │  │  ├─ details/
│  │  │  │  │  ├─ filter.jsx
│  │  │  │  │  ├─ listing.jsx
│  │  │  │  │  └─ listProduct.jsx
│  │  │  │  ├─ header.jsx
│  │  │  │  ├─ notification/
│  │  │  │  │  └─ modal.jsx
│  │  │  │  ├─ profile/
│  │  │  │  │  ├─ delete/
│  │  │  │  │  │  └─ index.jsx
│  │  │  │  │  ├─ notification/
│  │  │  │  │  │  ├─ ecom.jsx
│  │  │  │  │  │  ├─ order.jsx
│  │  │  │  │  │  ├─ promotion.jsx
│  │  │  │  │  │  └─ wallet.jsx
│  │  │  │  │  ├─ order/
│  │  │  │  │  │  └─ order.jsx
│  │  │  │  │  ├─ payment/
│  │  │  │  │  │  ├─ checkout.jsx
│  │  │  │  │  │  ├─ index.jsx
│  │  │  │  │  │  └─ paypal.jsx
│  │  │  │  │  ├─ user/
│  │  │  │  │  │  ├─ address.jsx
│  │  │  │  │  │  ├─ option.jsx
│  │  │  │  │  │  ├─ password.jsx
│  │  │  │  │  │  └─ user.jsx
│  │  │  │  │  └─ voucher/
│  │  │  │  │     └─ voucher.jsx
│  │  │  │  ├─ recommend/
│  │  │  │  │  └─ index.jsx
│  │  │  │  ├─ sale/
│  │  │  │  │  └─ index.jsx
│  │  │  │  ├─ search/
│  │  │  │  │  └─ index.jsx
│  │  │  │  └─ slides.jsx
│  │  │  └─ ui/
│  │  │     ├─ accordion.jsx
│  │  │     ├─ alert-dialog.jsx
│  │  │     ├─ avatar.jsx
│  │  │     ├─ badge.jsx
│  │  │     ├─ button.jsx
│  │  │     ├─ checkbox.jsx
│  │  │     ├─ dialog.jsx
│  │  │     ├─ dropdown-menu.jsx
│  │  │     ├─ input.jsx
│  │  │     ├─ label.jsx
│  │  │     ├─ select.jsx
│  │  │     ├─ selectaddress.jsx
│  │  │     ├─ sheet.jsx
│  │  │     ├─ table.jsx
│  │  │     ├─ textarea.jsx
│  │  │     ├─ toast.jsx
│  │  │     └─ toaster.jsx
│  │  ├─ config/
│  │  │  └─ index.js
│  │  ├─ hooks/
│  │  │  ├─ custom.js
│  │  │  ├─ products.jsx
│  │  │  ├─ textAmination.jsx
│  │  │  └─ use-toast.js
│  │  ├─ index.css
│  │  ├─ lib/
│  │  │  └─ utils.js
│  │  ├─ main.jsx
│  │  ├─ pages/
│  │  │  ├─ admin/
│  │  │  │  ├─ auth/
│  │  │  │  │  └─ login.jsx
│  │  │  │  └─ home/
│  │  │  │     ├─ block/
│  │  │  │     │  └─ index.jsx
│  │  │  │     ├─ delete/
│  │  │  │     │  ├─ manager.jsx
│  │  │  │     │  └─ user.jsx
│  │  │  │     ├─ index.jsx
│  │  │  │     ├─ trafic/
│  │  │  │     │  └─ index.jsx
│  │  │  │     ├─ trashUser/
│  │  │  │     │  └─ index.jsx
│  │  │  │     └─ voucher/
│  │  │  │        └─ index.jsx
│  │  │  ├─ auth/
│  │  │  ├─ manager/
│  │  │  │  ├─ category.jsx
│  │  │  │  ├─ home.jsx
│  │  │  │  ├─ login.jsx
│  │  │  │  ├─ product.jsx
│  │  │  │  └─ register.jsx
│  │  │  ├─ not-found/
│  │  │  └─ shop/
│  │  │     ├─ allcategory.jsx
│  │  │     ├─ block.jsx
│  │  │     ├─ cardProduct.jsx
│  │  │     ├─ details.jsx
│  │  │     ├─ home.jsx
│  │  │     ├─ login.jsx
│  │  │     ├─ profile.jsx
│  │  │     ├─ regsiter.jsx
│  │  │     ├─ shoppingCart.jsx
│  │  │     └─ shoppingPayment.jsx
│  │  ├─ router/
│  │  │  └─ index.jsx
│  │  ├─ services/
│  │  │  ├─ firebase/
│  │  │  │  └─ config.js
│  │  │  └─ momo/
│  │  ├─ store/
│  │  │  ├─ admin/
│  │  │  │  ├─ auth/
│  │  │  │  └─ index.js
│  │  │  ├─ index.js
│  │  │  ├─ manager/
│  │  │  │  ├─ auth/
│  │  │  │  │  └─ index.js
│  │  │  │  ├─ category/
│  │  │  │  │  └─ index.js
│  │  │  │  └─ product/
│  │  │  │     └─ index.js
│  │  │  └─ Shop/
│  │  │     ├─ auth/
│  │  │     │  └─ index.js
│  │  │     └─ users/
│  │  │        ├─ index.js
│  │  │        └─ userThunk.js
│  │  ├─ test/
│  │  │  └─ index.jsx
│  │  └─ validations/
│  │     └─ Yup/
│  │        ├─ adminYupForm.js
│  │        └─ useYupForm.js
│  ├─ tailwind.config.js
│  ├─ vite.config.js
│  └─ webpack.config.js
├─ README.md
├─ socket/
│  ├─ .babelrc
│  ├─ .gitignore
│  ├─ index.js
│  ├─ package-lock.json
│  ├─ package.json
│  └─ src/
│     ├─ chatmessage.js
│     ├─ countDown.js
│     └─ sendManager.js
└─ suoc.md
