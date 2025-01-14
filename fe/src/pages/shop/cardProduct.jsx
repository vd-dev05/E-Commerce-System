import { useLocation } from "react-router";
import React, { useRef, useState } from "react";

const CardProduct = () => {
  const location = useLocation();
  const dataImage = [
    "https://picsum.photos/200/300",
    "https://fastly.picsum.photos/id/607/200/200.jpg?hmac=ULikjE_L4XAS018UC9F2dCEiYIPKAFUW8oBDI2LzduY",
    "https://picsum.photos/200/300",
    "https://fastly.picsum.photos/id/607/200/200.jpg?hmac=ULikjE_L4XAS018UC9F2dCEiYIPKAFUW8oBDI2LzduY",
    "https://picsum.photos/200/300",
  ];

  const [images, setImages] = useState(dataImage[0]);

  return (
    <div>
      <header>Header</header>
      <div className="py-5">
        {/* path name */}
        <div>{location.pathname}</div>

        <div className="grid grid-cols-5 gap-4">
          {/* {dataImage.map((item) => (
          
          ))} */}
        
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
