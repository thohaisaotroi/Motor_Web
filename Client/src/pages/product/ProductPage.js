import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAllMotor } from '../../apis/motor';
import CardsGrid from '../../components/CardsGrid';
import { useSpinner } from '../../contexts/SpinnerContext';

import './ProductPage.scss';
import { getAllAccessories } from '../../apis/accessories';

const ProductPage = () => {
    const params = useParams();
    const { setLoading } = useSpinner();
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        setLoading(true);
        // Giả lập fetch data
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [setLoading]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [motorsRes, accessoriesRes] = await Promise.all([
                    getAllMotor(),
                    getAllAccessories(),
                ]);

                const allProducts = [
                    ...motorsRes.metadata,
                    ...accessoriesRes.metadata,
                ];
                setProducts(allProducts);
                setFilteredProducts(allProducts);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        filterProducts(query, minPrice, maxPrice);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
        filterProducts(searchQuery, event.target.value, maxPrice);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
        filterProducts(searchQuery, minPrice, event.target.value);
    };

    const filterProducts = (query, min, max) => {
        const filtered = products.filter((product) => {
            const matchesSearch = product.itemName
                .toLowerCase()
                .includes(query);
            const price = product.itemPrice;

            const matchesPrice =
                (min === '' || price >= parseFloat(min)) &&
                (max === '' || price <= parseFloat(max));

            return matchesSearch && matchesPrice;
        });

        setFilteredProducts(filtered);
    };

    const transformData = (products) => {
        const categories = {};

        products.forEach((product) => {
            const { category, subCategory } = product;

            if (!categories[category]) {
                categories[category] = {};
            }

            if (!categories[category][subCategory]) {
                categories[category][subCategory] = [];
            }

            categories[category][subCategory].push(product);
        });

        return Object.keys(categories).map((category) => ({
            category,
            subCategories: Object.keys(categories[category]).map(
                (subCategory) => ({
                    subCategory,
                    products: categories[category][subCategory],
                })
            ),
        }));
    };

    const items = transformData(filteredProducts);

    let displayItems;
    if (params.subCategory) {
        const formattedSubCategory = params.subCategory.replace(/-/g, ' ');
        displayItems = items.flatMap((category) =>
            category.subCategories.filter(
                (sub) =>
                    sub.subCategory.toLowerCase() ===
                    formattedSubCategory.toLowerCase()
            )
        );
    } else if (params.productCategory) {
        const formattedProductCategory = params.productCategory.replace(
            /-/g,
            ' '
        );
        displayItems = items.filter(
            (category) =>
                category.category.toLowerCase() ===
                formattedProductCategory.toLowerCase()
        );
    } else {
        displayItems = items;
    }

    return (
        <div style={{ paddingTop: '100px' }} className="productsPage">
            <div className="searchContainer">
                <input
                    type="text"
                    placeholder="Tìm sản phẩm..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="searchInput"
                />
            </div>
            <div className="filterSection">
                <div className="priceFilter flex w-full items-center">
                    <label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            placeholder="Giá nhỏ nhất"
                            className="priceInput"
                        />
                    </label>
                    <div className="flex bg-gray-300 w-5 h-1"></div>
                    <label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            placeholder="Giá lớn nhất"
                            className="priceInput"
                        />
                    </label>
                </div>
            </div>
            {displayItems.length > 0 ? (
                params.subCategory ? (
                    displayItems.map((sub, index) => (
                        <div key={index} className="chargingWrapper">
                            <h3>{sub.subCategory.replace(/-/g, ' ')}</h3>
                            <CardsGrid products={sub.products} />
                        </div>
                    ))
                ) : (
                    displayItems.map((category, i) => (
                        <div key={i} className="chargingWrapper">
                            <h2>{category.category}</h2>
                            {category.subCategories.map((sub, index) => (
                                <div key={index} className="atHome">
                                    <h3>
                                        {sub.subCategory.replace(/-/g, ' ')}
                                    </h3>
                                    <CardsGrid products={sub.products} />
                                </div>
                            ))}
                        </div>
                    ))
                )
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default ProductPage;
