import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ButtonAuth from '../../components/auth/ButtonAuth';
import InputAuth from '../../components/auth/InputAuth';
import { addToCart } from '../../apis/cart';
import { addItem } from '../../app/features/cartSlice';
import Tesfayedev from '../../components/shopPage/Tesfayedev';
import SoundEngine from '../../components/productPage/SoundEngine';
import DataAndEquipment from '../../components/productPage/DataEquipment';
import { useSpinner } from '../../contexts/SpinnerContext';

import { ReactComponent as SectionHeadlinesNeutral } from '../../Assets/icon/section_headlines_neutral.svg';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './productDetail.scss';
import 'swiper/swiper-bundle.css';

const ProductDetail = () => {
    const { setLoading } = useSpinner();

    const dispatch = useDispatch();
    const location = useLocation();

    const { user } = useSelector((state) => state.auth);
    const { product } = location.state || {};

    const images = [product?.itemImg, product?.itemImgHover];
    const dataAndEquipment = product?.dataAndEquipment;
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [checkClick, setCheckClick] = useState(false);
    const [startEngine, setStartEngine] = useState(false);
    const [selectedColor, setSelectedColor] = useState(
        product?.productDetails[0]?.colorId || null
    );

    // Ref
    const audioRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [setLoading, product]);

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : images.length - 1
        );
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
    };

    // const handleQuantityChange = (amount) => {
    //     setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
    // };
    const handleQuantityChange = (amount) => {
        setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity + amount;
            // Ensure quantity is between 1 and 20
            return Math.min(Math.max(1, newQuantity), 20);
        });
    };

    const handleColorChange = (colorId) => {
        setSelectedColor(colorId);
    };

    // Find the details for the selected color
    const selectedColorDetail =
        product?.productDetails.find(
            (detail) => detail.colorId === selectedColor
        ) || {};

    const handleAddToCart = async () => {
        const payload = {
            type: product.category === 'motors' ? 'motor' : 'accessories',
            productId: selectedColorDetail.id,
            quantity: quantity,
        };

        try {
            // console.log(payload);
            const response = await addToCart(payload);
            if (response.metadata) {
                dispatch(
                    addItem({
                        type:
                            product.category === 'motors'
                                ? 'motor'
                                : 'accessories',

                        id: response.metadata.id,
                        productName: product.itemName,
                        quantity: quantity,
                        price:
                            selectedColorDetail.salePrice <
                            selectedColorDetail.originalPrice
                                ? selectedColorDetail.salePrice
                                : selectedColorDetail.originalPrice,
                    })
                );
                console.log('Item added to cart!', response.metadata);
            }
        } catch (error) {
            console.error('Failed to add item to cart', error);
        }
    };

    const handleToggleEngine = () => {
        if (audioRef.current) {
            if (startEngine) {
                // Stop and reset the audio
                console.log('go', dataAndEquipment.sound);
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            } else {
                // Play the audio from the start
                audioRef.current.play().catch((error) => {
                    console.error('Error playing audio:', error);
                });
            }
            setStartEngine(!startEngine);
        }
    };

    useEffect(() => {
        const audioElement = audioRef.current;

        const handleAudioEnd = () => {
            setStartEngine(false); // Reset startEngine when audio ends
        };

        if (audioElement) {
            audioElement.addEventListener('ended', handleAudioEnd);
        }

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('ended', handleAudioEnd);
            }
        };
    }, []);

    return (
        <>
            <div className="product-detail-component flex bg-[#111] px-5">
                <div className="product-content-carousel flex flex-col mt-[100px] pr-8">
                    <div
                        className="swiper-container relative w-full h-full min-h-[65vw] max-h-[65vw] max-w-[65vw] min-w-[65vw]"
                        onMouseEnter={() => setIsFocused(true)}
                        onMouseLeave={() => setIsFocused(false)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        tabIndex="0"
                    >
                        <img
                            className="product-img-main w-full h-full object-cover"
                            src={images[activeIndex]}
                            alt="Product main"
                        />
                        <div className="stockStatus">
                            {!product?.stockStatus && <p>Hết hàng</p>}
                        </div>
                        <button
                            onClick={handlePrev}
                            className={`absolute w-9 h-9 left-2 top-1/2 transform -translate-y-1/2 bg-[#8e8e8e] text-white p-2 transition-opacity duration-300 ${
                                isFocused ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            {'<'}
                        </button>
                        <button
                            onClick={handleNext}
                            className={`absolute w-9 h-9 right-2 top-1/2 transform -translate-y-1/2 bg-[#8e8e8e] text-white p-2 transition-opacity duration-300 ${
                                isFocused ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            {'>'}
                        </button>
                    </div>

                    <div className="swiper-thumb flex space-x-4 w-full mt-4 mb-4">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                className="swiper-img w-1/5 object-cover cursor-pointer"
                                src={image}
                                alt={`Thumbnail img ${index + 1}`}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="product-container-side flex flex-col pl-4 mt-[100px] max-w-[30%] text-left mr-12">
                    <h2 className="product-title flex text-[#ffffff] text-[28px]">
                        {product?.itemName}
                    </h2>
                    <div className="">
                        <div className="product-details flex flex-col mt-2 pr-[90px] min-w-[430px]">
                            {product?.stockStatus ? (
                                <>
                                    <p className="product-price text-[#fff] text-[18px] mb-2">
                                        {selectedColorDetail?.salePrice <
                                        selectedColorDetail?.originalPrice
                                            ? selectedColorDetail?.salePrice?.toLocaleString(
                                                  'en-US'
                                              )
                                            : selectedColorDetail?.originalPrice?.toLocaleString(
                                                  'en-US'
                                              )}{' '}
                                        VND
                                    </p>

                                    {!user && (
                                        <p className="text-[#8e8e8e] text-[12px] mb-3">
                                            Nếu phù hợp với bạn thì vui lòng
                                            đăng nhập để mua hàng
                                            <a
                                                href="/groupproject/signin"
                                                className="text-[#fff] text-[12px] mb-3 underline"
                                            >
                                                {' '}
                                                ĐĂNG NHẬP
                                            </a>
                                        </p>
                                    )}

                                    {product?.productDetails[0]?.colorId && (
                                        <>
                                            <label className="flex my-2 text-[#fff]">
                                                MÀU SẮC
                                            </label>
                                            <div className="flex space-x-2 mb-4">
                                                {product?.productDetails.map(
                                                    (detail) => (
                                                        <button
                                                            key={detail.colorId}
                                                            onClick={() =>
                                                                handleColorChange(
                                                                    detail.colorId
                                                                )
                                                            }
                                                            className={`color-option relative w-8 h-8 rounded-full border-2 border-[#333] p-1 ${
                                                                selectedColor ===
                                                                detail.colorId
                                                                    ? 'border-[#fff]'
                                                                    : ''
                                                            }`}
                                                        >
                                                            <img
                                                                src={
                                                                    detail.colorImage
                                                                }
                                                                alt={
                                                                    detail.color
                                                                }
                                                                className={`w-full h-full object-cover rounded-full ${
                                                                    selectedColor ===
                                                                    detail.colorId
                                                                        ? 'ring-2 ring-offset-2 ring-[#fff]'
                                                                        : ''
                                                                }`}
                                                            />
                                                            {selectedColor ===
                                                                detail.colorId && (
                                                                <div className="selected-overlay w-full h-full flex items-center justify-center">
                                                                    <svg
                                                                        className="w-4 h-4 text-white"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M5 13l4 4L19 7"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </>
                                    )}

                                    <label className="flex my-2 text-[#fff]">
                                        SỐ LƯỢNG
                                    </label>
                                    <div className="quantity-input flex items-center mb-4">
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(-1)
                                            }
                                            className={`quantity-btn text-white p-2 ${
                                                quantity === 1
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : ''
                                            } `}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            className="quantity-field mx-2 border-1 border-[#393c41] w-[80px] h-[50px] text-white text-center justify-center items-center bg-transparent"
                                            value={quantity}
                                            readOnly
                                            onChange={(e) =>
                                                // setQuantity(e.target.value)
                                                {
                                                    const value = Math.min(
                                                        Math.max(
                                                            1,
                                                            parseInt(
                                                                e.target.value,
                                                                10
                                                            )
                                                        ),
                                                        20
                                                    );
                                                    setQuantity(value);
                                                }
                                            }
                                        />
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(1)
                                            }
                                            className="quantity-btn text-white p-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <ButtonAuth
                                        title={'THÊM VÀO GIỎ HÀNG'}
                                        className={'btn-sign-up'}
                                        onClick={handleAddToCart}
                                    />
                                </>
                            ) : (
                                <>
                                    <label className="flex mt-2 text-[#c7c7c7] text-xs font-medium">
                                        SẢN PHẨM ĐÃ HẾT HÀNG
                                    </label>
                                    {!checkClick ? (
                                        <label
                                            className="mt-4 flex text-[#c7c7c7] text-xs font-medium underline cursor-pointer"
                                            onClick={() => setCheckClick(true)}
                                        >
                                            NHẬP EMAIL ĐỂ CHÚNG TÔI SẼ THÔNG BÁO
                                            CHO BẠN KHI CÓ HÀNG
                                        </label>
                                    ) : (
                                        <div className="flex flex-col mt-2">
                                            <label className="my-2 flex text-[#a2a3a5] text-xs font-medium">
                                                EMAIL
                                            </label>
                                            <InputAuth
                                                type={'email'}
                                                className={
                                                    'w-full mb-2.5 bg-transparent text-[#a2a3a5] border-1 border-solid border-[#333] p-2.5'
                                                }
                                            />
                                            <ButtonAuth
                                                title={'THÔNG BÁO CHO TÔI'}
                                                className={'btn-sign-up'}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="product-description flex flex-col mt-4">
                            <label className="flex text-[#fff]">MÔ TẢ</label>
                            <div className="mt-2 text-[#8e8e8e] text-[13px]">
                                <p>{product?.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {dataAndEquipment && (
                <div>
                    {dataAndEquipment.imgData && (
                        <DataAndEquipment
                            dataAndEquipment={dataAndEquipment}
                            type={product.subCategory}
                        />
                    )}

                    {dataAndEquipment.imgStartEngineer && (
                        <SoundEngine
                            dataAndEquipment={dataAndEquipment}
                            handleToggleEngine={handleToggleEngine}
                            audioRef={audioRef}
                            startEngine={startEngine}
                            type={product.subCategory}
                        />
                    )}
                </div>
            )}
            <div className="flex justify-center items-center my-6">
                <div className="w-[300px] h-[2px] bg-black min-w-[240px]"></div>
                <SectionHeadlinesNeutral className="w-[240px] h-[120px]" />
                <div className="w-[300px] h-[2px] bg-black min-w-[240px]"></div>
            </div>
            <div>
                <Tesfayedev />
            </div>
        </>
    );
};

export default ProductDetail;
