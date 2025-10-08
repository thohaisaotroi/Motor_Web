import React, { useState } from 'react';
import { useGetAllColorQuery } from '../../apis/colorApi';
import { useUploadFirebaseMutation } from '../../apis/uploadFirebaseApi';

const AddAccessoriesModal = ({ isOpen, onClose, onSubmit, categories }) => {
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        originalPrice: '',
        motorId: '',
        mfg: '',
        img: null,
        imgHover: null,
        accessoriesDetails: [
            {
                originalPrice: '',
                salePrice: '',
                colorId: '',
                quantity: '',
            },
        ],
        images: [],
    });

    const [images, setimages] = useState({
        img: null,
        imgHover: null,
        images: [],
    });
    const { data: colors } = useGetAllColorQuery();
    const [uploadFirebase] = useUploadFirebaseMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setimages((prevData) => ({
            ...prevData,
            img: file,
        }));
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    img: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleHoverImageChange = (e) => {
        const file = e.target.files[0];
        setimages((prevData) => ({
            ...prevData,
            imgHover: file,
        }));
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    imgHover: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMultipleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setimages((prevData) => ({
            ...prevData,
            images: files,
        }));
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setFormData((prevData) => ({
            ...prevData,
            images: imageUrls,
        }));
    };

    const handleAccessoriesDetailChange = (index, e) => {
        const { name, value } = e.target;
        const updatedAccessoriesDetails = formData.accessoriesDetails.map(
            (detail, i) => (i === index ? { ...detail, [name]: value } : detail)
        );
        setFormData((prevData) => ({
            ...prevData,
            accessoriesDetails: updatedAccessoriesDetails,
        }));
    };

    const addAccessoriesDetail = () => {
        setFormData((prevData) => ({
            ...prevData,
            accessoriesDetails: [
                ...prevData.accessoriesDetails,
                {
                    originalPrice: '',
                    salePrice: '',
                    colorId: '',
                    quantity: '',
                },
            ],
        }));
    };

    const removeAccessoriesDetail = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            accessoriesDetails: prevData.accessoriesDetails.filter(
                (_, i) => i !== index
            ),
        }));
    };

    const handleSubmit = async () => {
        try {
            const imageUploadPromises = [];

            if (images.img) {
                const imgUploadPromise = uploadFirebase({
                    files: [images.img],
                }).then((response) => response.data?.metadata);
                imageUploadPromises.push(imgUploadPromise);
            }
            if (images.imgHover) {
                const imgHoverUploadPromise = uploadFirebase({
                    files: [images.imgHover],
                }).then((response) => response.data?.metadata);
                imageUploadPromises.push(imgHoverUploadPromise);
            }
            if (images.images.length > 0) {
                const multipleImagesUploadPromise = uploadFirebase({
                    files: images.images,
                }).then((response) => response.data?.metadata);
                imageUploadPromises.push(multipleImagesUploadPromise);
            }

            const [imgMetadata, imgHoverMetadata, imagesMetadata] =
                await Promise.all(imageUploadPromises);

            const imgUrls = imgMetadata ? [imgMetadata[0]] : null;
            const imgHoverUrls = imgHoverMetadata
                ? [imgHoverMetadata[0]]
                : null;
            const imagesUrls = imagesMetadata ? imagesMetadata : null;

            // Set the URLs in formData
            const updatedFormData = {
                ...formData,
                img: imgUrls[0] || null,
                imgHover: imgHoverUrls[0] || null,
                images: imagesUrls.length > 0 ? imagesUrls : null,
            };

            onSubmit(updatedFormData);
            onClose();
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-add">
            <div className="modal-content">
                <h2 className="text-xl mb-4">Thêm sản phẩm mới</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Tên
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Mô tả
                    </label>
                    <textarea
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Giá
                    </label>
                    <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Danh mục
                    </label>
                    <select
                        name="motorId"
                        value={formData.motorId}
                        onChange={handleChange}
                        className="border border-gray-300 rounded w-full p-2"
                    >
                        <option value="">Chọn danh mục</option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Năm sản xuất
                    </label>
                    <input
                        type="text"
                        name="mfg"
                        value={formData.mfg}
                        onChange={handleChange}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Ảnh chính 1
                    </label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                    {formData.img && (
                        <img
                            src={formData.img}
                            alt="Preview"
                            className="mt-2 w-full h-40 object-cover"
                        />
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Ảnh chính 2
                    </label>
                    <input
                        type="file"
                        onChange={handleHoverImageChange}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                    {formData.imgHover && (
                        <img
                            src={formData.imgHover}
                            alt="Hover Preview"
                            className="mt-2 w-full h-40 object-cover"
                        />
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Ảnh chi tiết
                    </label>
                    <input
                        type="file"
                        multiple
                        onChange={handleMultipleImagesChange}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                    {formData.images.length > 0 && (
                        <div className="mt-2 grid grid-cols-3 gap-2">
                            {formData.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Additional Preview ${index + 1}`}
                                    className="w-full h-20 object-cover"
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-lg mb-2">Chi tiết phụ tùng</h3>
                    {formData.accessoriesDetails.map((detail, index) => (
                        <div key={index} className="mb-4 border p-4 rounded">
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">
                                    Giá
                                </label>
                                <input
                                    type="number"
                                    name="originalPrice"
                                    value={detail.originalPrice}
                                    onChange={(e) =>
                                        handleAccessoriesDetailChange(index, e)
                                    }
                                    className="border border-gray-300 rounded w-full p-2"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">
                                    Giá khuyến mãi
                                </label>
                                <input
                                    type="number"
                                    name="salePrice"
                                    value={detail.salePrice}
                                    onChange={(e) =>
                                        handleAccessoriesDetailChange(index, e)
                                    }
                                    className="border border-gray-300 rounded w-full p-2"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">
                                    Màu sắc
                                </label>
                                <select
                                    name="colorId"
                                    value={detail.colorId}
                                    onChange={(e) =>
                                        handleAccessoriesDetailChange(index, e)
                                    }
                                    className="border border-gray-300 rounded w-full p-2"
                                >
                                    <option value="">Chọn màu</option>
                                    {colors?.metadata?.map((color) => (
                                        <option key={color.id} value={color.id}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">
                                    Số lượng
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={detail.quantity}
                                    onChange={(e) =>
                                        handleAccessoriesDetailChange(index, e)
                                    }
                                    className="border border-gray-300 rounded w-full p-2"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeAccessoriesDetail(index)}
                                className="text-red-500"
                            >
                                Xoá
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addAccessoriesDetail}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Thêm chi tiết
                    </button>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                    <button onClick={onClose} className="btn btn-secondary">
                        Huỷ bỏ
                    </button>
                    <button onClick={handleSubmit} className="btn btn-primary">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddAccessoriesModal;
