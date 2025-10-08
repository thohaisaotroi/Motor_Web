import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { ShopNowButton } from '../Styled';
import './HeroCarousel.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const carouselItems = [
    {
        imageUrl:
            'https://www.experiencemotorcycles.co.nz/assets/uploads/2016/02/DESERT.jpg',
        title: 'Tìm sản phẩm phù hợp với bạn',
        subtitle: 'Dịch vụ xứng đáng với bạn',
        link: '/groupproject/category/motors',
    },
    {
        imageUrl:
            'https://www.roadrider.com.au/wp-content/uploads/2016/09/143910.jpg',
        title: 'Tìm sản phẩm phù hợp với bạn',
        subtitle: 'Dịch vụ xứng đáng với bạn',
        link: '/groupproject/category/motors',
    },
    {
        imageUrl:
            'https://images.unsplash.com/photo-1550966871-47324cfb6278?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJtdyUyMG1vdG9yY3ljbGV8ZW58MHx8MHx8fDA%3D',
        title: 'Tìm sản phẩm phù hợp với bạn',
        subtitle: 'Dịch vụ xứng đáng với bạn',
        link: '/groupproject/category/motors',
    },
];

export default function HeroCarousel() {
    const navigate = useNavigate();

    return (
        <div className="hero-carousel">
            <Carousel
                autoPlay
                infiniteLoop
                emulateTouch
                interval={5000}
                showThumbs={false}
            >
                {carouselItems.map((item, index) => (
                    <div key={index} className="carousel-image-container">
                        <img
                            src={item.imageUrl}
                            alt={`Carousel slide ${index}`}
                        />
                        <div className="carousel-text">
                            <h1>{item.title}</h1>
                            <h2>{item.subtitle}</h2>
                            <div
                                className="text-black"
                                onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    });

                                    navigate(item.link);
                                }}
                            >
                                <ShopNowButton>MUA NGAY</ShopNowButton>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
