import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";


const ProductImageUpload = ({ setImageLoading, imageLoading, imageFile, setImageFile, uploadImageUrl, setUploadImageUrl, isEditMode }) => {

    const inputRef = useRef(null)

    const handleImageFileChange = (e) => {
        const selectFile = e.target.files?.[0];
        if (selectFile) setImageFile(selectFile);
    }
    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.file?.[0];
        if (droppedFile) setImageFile(droppedFile)
    }

    const handleRemoveImage = () => {
        setImageFile(null)
        setUploadImageUrl(null)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    const uploadImageToCloudinary = async () => {
        setImageLoading(true)
        const data = new FormData();
        data.append("my_file", imageFile)
        const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data);

        if (response.data?.success) {
            setUploadImageUrl(response.data.result.url)
            setImageLoading(false)
        }
    }

    useEffect(() => {
        if (imageFile !== null) {
            uploadImageToCloudinary()
        }
    }, [imageFile])


    return (
        <div className="w-full max-w-md mx-auto my-2">
            <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
            <div className={`border-2 border-dashed rounded-lg p-4 mb-2`} onDragOver={handleDragOver} onDrop={handleDrop}>
                <Input id="image-upload"
                    type="file"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleImageFileChange}

                />
                {
                    (uploadImageUrl || imageFile) ? (
                        imageLoading ? (
                            <Skeleton className="h-48 bg-gray-500 rounded-md" />
                        ) : (
                            <div className="flex items-center relative">
                                <img
                                    src={imageFile ? URL.createObjectURL(imageFile) : uploadImageUrl}
                                    alt="Product"
                                    className="size-30 rounded-md"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 text-black hover:text-foreground"
                                    onClick={handleRemoveImage}
                                >
                                    <XIcon className="w-5 h-5" />
                                    <span className="sr-only">Remove File</span>
                                </Button>
                            </div>
                        )
                    ) : (
                        <Label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center h-32 cursor-pointer"
                        >
                            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                            <span>{isEditMode ? "Click to change image" : "Click to upload image"}</span>
                        </Label>
                    )
                }

            </div>
        </div>
    );
}

export default ProductImageUpload