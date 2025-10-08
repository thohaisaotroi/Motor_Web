import React, { useState } from 'react';

import { useGetAllColorQuery } from '../../apis/colorApi';
import { formatDate } from '../../utils';
import {
    useDeleteAccessoriesMutation,
    useUpdateAccessoriesMutation,
} from '../../apis/accessoriesApi';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const AccessoriesEditModal = ({ product, categories, onClose, onRefetch }) => {
    const { data: colors } = useGetAllColorQuery();
    const [deleteAccessories] = useDeleteAccessoriesMutation();
    const [updateAccessories] = useUpdateAccessoriesMutation();
    const [editableProduct, setEditableProduct] = useState({ ...product });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setEditableProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpload = async () => {
        // Implement upload logic
        try {
            console.log('Upload:', editableProduct);
            const res = await updateAccessories(editableProduct).unwrap();
            if (res.metadata) {
                onRefetch();
                onClose();
                toast('Cập nhật thành công!');
            } else {
                toast.error('Cập nhật thất bại!');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to Upload the product. Please try again.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteAccessories(editableProduct.id).unwrap();
                onRefetch();
                onClose();
                toast('Xoá thành công!');
            } catch (error) {
                console.error('Delete failed:', error);
                alert('Failed to delete the product. Please try again.');
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Chi tiết sản phẩm
                </h2>
                <div className="mb-4">
                    <img
                        src={editableProduct.img}
                        alt={editableProduct.name}
                        className="w-32 h-32 object-cover rounded mx-auto mb-4"
                    />
                    <div className="space-y-2 mb-4">
                        <div>
                            <label className="block font-medium">Tên:</label>
                            <input
                                type="text"
                                name="name"
                                value={editableProduct.name}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">
                                Màu sắc:
                            </label>
                            <select
                                name="colorId"
                                value={editableProduct.colorId || ''}
                                onChange={handleSelectChange}
                                className="w-full border border-gray-300 rounded p-2"
                            >
                                <option value="">Chọn màu</option>
                                {colors?.metadata &&
                                    colors.metadata.map((color) => (
                                        <option key={color.id} value={color.id}>
                                            {color.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium">
                                Năm sản xuất:
                            </label>
                            <input
                                type="text"
                                name="mfg"
                                value={editableProduct.mfg}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Giá:</label>
                            <input
                                type="text"
                                name="originalPrice"
                                value={editableProduct.originalPrice}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        </div>
                        {/* <div>
                            <label className="block font-medium">
                                Sale Price:
                            </label>
                            <input
                                type="text"
                                name="salePrice"
                                value={editableProduct.salePrice}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        </div> */}
                        <div>
                            <label className="block font-medium">
                                Danh mục:
                            </label>
                            <select
                                name="categoryId"
                                value={editableProduct.categoryId || ''}
                                onChange={handleSelectChange}
                                className="w-full border border-gray-300 rounded p-2"
                            >
                                <option value="">Chọn danh mục</option>
                                {categories &&
                                    categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium">
                                Số lượng tồn:
                            </label>
                            <input
                                type="text"
                                name="quantity"
                                value={editableProduct.quantity}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">
                                Ngày tạo:
                            </label>
                            <input
                                type="text"
                                name="createdAt"
                                value={formatDate(editableProduct.createdAt)}
                                readOnly
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleUpload}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Cập nhật
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Xoá
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessoriesEditModal;
