import * as Yup from 'yup'
export const adminVoucherSchema = Yup.object().shape({
  promotionTitle: Yup.string()
    .required("Required")
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 50 characters"),
  promotionDescription: Yup.string()
    .required("Required")
    .min(3, "Minimum 3 characters")
    .max(1000, "Maximum 1000 characters"),
  discountCode: Yup.string()
    .required("Required")
    .min(3, "Minimum 3 characters")
    .max(6, "Maximum 6 characters"),
  endDate: Yup.date()
    .required("Required")
    .min(new Date(), "Ngay ket thuc ko duoc nho hon ngay thuong")
    .typeError("Invalid date")
    .nullable(),
  discountAmount: Yup.number()
    .required("Required")
    .min(1, "Minimum 1 characters"),
  // userType: Yup.string()
  //   .required("Required")
  //   .oneOf(["all", "user_month", "user_year", "user_voucher"], "User type must be all, user_month, user_year, user_voucher")

})
export const adminNotificationSchema = Yup.object().shape({
  promotionTitle: Yup.string()
    .required("Required")
    .min(3, "Minimum 3 characters")
    .max(100, "Maximum 50 characters"),
  promotionDescription: Yup.string()
    .required("Required")
    .min(3, "Minimum 3 characters")
    .max(1000, "Maximum 1000 characters"),
  endDate: Yup.date()
    .required("Required")
    .min(new Date(), "Ngay ket thuc ko duoc nho hon ngay thuong")
    .typeError("Invalid date")
    .nullable(),
  image: Yup.string()
    .required("Required"),

  // userType : Yup.string()
  //   .required("Required")
  //   .oneOf(["all", "user_month", "user_year", "user_voucher"], "User type must be all, user_month, user_year, user_voucher")

})