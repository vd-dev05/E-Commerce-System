import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function formatPrice(price) {
  return new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

function formatTitle(title) {
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
function formatTimeCountDown(time) {
  return time < 10 ? "0" + time : time.toString();
}
export {
  formatPrice,
  formatTitle,
  cn,
  formatTimeCountDown
}