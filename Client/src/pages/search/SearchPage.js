import React, { useEffect, useState } from 'react';
import { useSearch } from '../../contexts/SearchContext';
import { getAllMotor } from '../../apis/motor';
import { getAllAccessories } from '../../apis/accessories';
import CardsGrid from '../../components/CardsGrid';
import { useSpinner } from '../../contexts/SpinnerContext';
import './SearchPage.scss';

const SearchPage = () => {
    const { searchQuery } = useSearch();
    const { setLoading } = useSpinner();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
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
            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };

        fetchProducts();
    }, [setLoading]);

    // Filter products whenever searchQuery or products change
    useEffect(() => {
        const filterProducts = (query) => {
            const filtered = products.filter((product) =>
                product.itemName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        };

        filterProducts(searchQuery);
    }, [searchQuery, products]);

    return (
        <div style={{ paddingTop: '100px' }} className="searchPage">
            <h1 className="flex font-bold text-2xl mb-4 uppercase">
                KẾT QUẢ CHO {searchQuery}{' '}
            </h1>
            <div className="searchResults">
                {filteredProducts.length > 0 ? (
                    <CardsGrid products={filteredProducts} />
                ) : (
                    <p>Không tìm thấy sản phẩm ...</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
