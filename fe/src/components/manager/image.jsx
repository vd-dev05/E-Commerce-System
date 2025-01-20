import { assets } from "@/assets/assets";
import { useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import axios from "axios";

const ProductImageUpload = ({ additionalImages, setAdditionalImages, mainImage, setMainImage, uploadImageUrl, setUploadImageUrl, imageLoading, setImageLoading }) => {

    const fileInputRef = useRef(); // Ref to simulate file input click

    const handleDragOver = (e) => {
        e.preventDefault()
    }
    const handleDrop = (e) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) setMainImage(droppedFile)
    }

    const handleMainImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setMainImage(file); // Store the file itself
        }
    };
    const handleRemoveImage = () => {
        setMainImage(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAdditionalImages((prevImages) => [...prevImages, file]);
        }
    };

    const handleAddImageClick = () => {
        fileInputRef.current.click();
    };


    const handleDeleteImage = (index) => {
        setAdditionalImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
    };

    const uploadImageToCloudinary = async () => {
        setImageLoading(true)
        const formData = new FormData();
        if (mainImage) {
            formData.append("mainImage", mainImage);
        }

        additionalImages.forEach((file) => {
            formData.append("additionalImages", file);
        });

        try {
            const response = await axios.post("http://localhost:5000/api/v1/manager/product/upload-images", formData);
            if (response.data.success) {
                setUploadImageUrl(response.data.data)
                setImageLoading(false);
            }
        } catch (error) {
            console.error("Upload error:", error);
        }
    }

    useEffect(() => {
        if (mainImage !== null || additionalImages !== null) {
            uploadImageToCloudinary()
        }
    }, [mainImage, additionalImages])
    console.log(uploadImageUrl);

    return (
        <div className="py-5">
            <p className="mb-2">Ảnh chính sản phẩm</p>
            <div className="flex justify-center py-2 relative">
                <label htmlFor="main-image">
                    <img className="w-56" src={mainImage ? URL.createObjectURL(mainImage) : assets.upload_area} alt="main" />
                    <input type="file" id="main-image" hidden onChange={handleMainImageChange} onDragOver={handleDragOver} onDrop={handleDrop} />
                    {
                        mainImage && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-2 rounded-full bg-red-500 text-white"
                                onClick={handleRemoveImage}
                                type="button"
                            >
                                <XIcon className="w-5 h-5" />
                            </Button>
                        )
                    }

                </label>
            </div>

            <p className="mb-2">Ảnh phụ sản phẩm (tùy chọn)</p>
            <div className="flex flex-wrap gap-2">
                {additionalImages.map((image, index) => (
                    <div key={index} className="relative group">
                        <img className="w-28" src={URL.createObjectURL(image)} alt={`optional-${index}`} />
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
