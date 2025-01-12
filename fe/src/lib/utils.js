import { categoryMapping } from "@/config";
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

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
function mapCategoryFromUrl(path) {

  return categoryMapping[path]
}
function formatTitleLenght(title,number =20) {
  return title.length > number ? title.slice(0,number) + "..." : title;
}
export {
  formatPrice,
  formatTitle,
  cn,
  formatTimeCountDown,
  formatDate,
  mapCategoryFromUrl,
  formatTitleLenght
}