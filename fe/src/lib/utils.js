import { categoryMapping } from "@/config";
import { clsx } from "clsx";
import { useLocation } from "react-router";
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
function formatPriceUSD(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 25000);
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
function formatDateCountDown(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {

    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
function formatTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(date));
}
function mapCategoryFromUrl(path) {

  return categoryMapping[path]
}
function formatTitleLenght(title,number = 20) {
  if (!title) return "not found text"
  return title.length > number ? title.slice(0,number) + "..." : title;
}

const locationQuery = () =>   {
  const location = useLocation()
  return location.search;
}
const locationPath = () =>   {
  const location = useLocation()
  return location.pathname;
}
function formatRatingLengt(rating) {
  if (rating >= 1000) {
    return `${Math.floor(rating / 1000)}k`;
  } 
  else if (rating >= 1500 ) {
    return `${Math.floor(rating / 1000)}k`;
  } 
  else if (rating >= 2000) {
    return `${Math.floor(rating / 1000)}k`;
  } else {
    return String(rating);
  }
}

const generateUniqueId = (item) => {
  const color = item?.variants[0]?.attributes?.find(attr => attr.name === "Màu sắc")?.value;
  const size = item?.variants[0]?.attributes?.find(attr => attr.name === "Kích thước")?.value;
  const beta = item?.variants[0]?.attributes?.find(attr => attr.name === "Chất liệu")?.value;
  return `${item?.productId?._id}-${item?.quantity}-${item?.price}-${color}-${size}-${beta}`;
};

export {
  formatPrice,
  formatTitle,
  cn,
  formatTimeCountDown,
  formatDate,
  mapCategoryFromUrl,
  formatTitleLenght,
  locationQuery,
  locationPath,
  formatPriceUSD,formatTime,formatRatingLengt,
  generateUniqueId ,
  formatDateCountDown
}