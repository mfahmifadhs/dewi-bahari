import './style.css'
import bannerKKP from '../../Assets/Images/banner-kkp.png'
// import Slider from "react-slick";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useState } from 'react';

const Banner = ({page, pageData}) => {
    const setings = {
        type: 'loop',
        // gap: '20px',
        autoplay: true,
        pauseOnHover: true,
        resetProgress: false,
        // height: '180px',
        width: '100%',
        speed: 1500,
        setInterval: 500,
        overflow: 'hidden',
        classes: {
            pagination: 'splide__pagination banner_pagination',
            page: 'splide__pagination__page banner_pagination_page',
            arrow: 'splide__arrow banner_arrow',

        }
    };

    const [data, setData] = useState(pageData)

    return (
        <div className='banner-container'>
            <Splide options={setings} aria-label="React Splide Example">
                { data &&
                    data.map((item) => {
                        return (
                            <SplideSlide >
                                <img src={item.image} className='banner-size' alt='banner' />
                            </SplideSlide>
                        )
                    })
                }
            </Splide>
        </div >
    )
}

export default Banner