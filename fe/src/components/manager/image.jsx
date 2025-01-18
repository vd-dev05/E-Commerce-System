import { assets } from "@/assets/assets";
import { useState, useRef } from "react";

const ProductImageUpload = () => {
    const [additionalImages, setAdditionalImages] = useState([]); // Store the list of uploaded images
    const fileInputRef = useRef(); // Ref to simulate file input click

    // Handle file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAdditionalImages((prevImages) => [...prevImages, URL.createObjectURL(file)]);
        }
    };

    // Handle click on "+" button to open file picker
    const handleAddImageClick = () => {
        fileInputRef.current.click(); // Simulate click on the hidden input
    };

    // Handle delete image
    const handleDeleteImage = (index) => {
        setAdditionalImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
    };

    return (
        <div className="py-5">
            <p className="mb-2">Ảnh chính sản phẩm</p>
            <div className="flex justify-center py-2">
                <label htmlFor="main-image">
                    <img className="w-56" src={assets.upload_area} alt="" />
                    <input type="file" id="main-image" hidden />
                </label>
            </div>

            <p className="mb-2">Ảnh phụ sản phẩm (tùy chọn)</p>
            <div className="flex flex-wrap gap-2">
                {additionalImages.map((image, index) => (
                    <div key={index} className="relative group">
                        <img className="w-28" src={image} alt={`optional-${index}`} />
                        <button
                            type="button"
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddImageClick}
                    className="size-28 border-dashed border-2 border-gray-300 flex items-center justify-center text-gray-500"
                >
                    +
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};

export default ProductImageUpload;
