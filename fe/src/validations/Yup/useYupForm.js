import * as Yup from 'yup'
export const userSchemaSignUpLogin = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Required")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Invalid email address"
      ),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
        "Password must be 7-19 characters and contain at least one letter, one number and a special character"
      ),
  })
  
export const userSchemaSignInRegister = Yup.object().shape({
    username: Yup.string()
      .required("Required")
      .min(3, "Minimum 3 characters")
      .max(20, "Maximum 20 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Only letters, numbers and underscores are allowed"
      ),
    email: Yup.string()
      .email("Invalid email address")
      .required("Required")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Invalid email address"
      ),
    phone: Yup.string()
      .required("Required")
      .matches(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        "Invalid phone number"
      ),
    birthday: Yup.date()
      .required("Required")
      .typeError("Invalid birthday of birth")
      .nullable(),
    gender: Yup.string()
      .required("Required")
      .oneOf(["Male", "Female"], "Gender must be male or female")
      .nullable(),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
        "Password must be 7-19 characters and contain at least one letter, one number and a special character"
      ),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  })
