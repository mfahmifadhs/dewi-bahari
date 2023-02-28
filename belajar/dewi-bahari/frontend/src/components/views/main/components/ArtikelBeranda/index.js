import React, { useEffect, useRef, useState } from 'react';
import './style.css'
// import Slider from "react-slick";
import gambarNyelam from "../../Assets/Images/nyelam.jpg"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useNavigate } from 'react-router-dom';

const ArtikelBeranda = ({ page, data }) => {
    const settings = {
        type: 'loop',
        gap: '45vw',
        perPage: 3,
        perMove: 1,
        focus: 'center',
        width: '100vw',
        overflow: 'hidden',
        classes: {
            pagination: 'splide__pagination artikel_pagination',
            page: 'splide__pagination__page artikel_pagination_page',
            arrow: 'splide__arrow artikel_arrow',

        }
    };

    const splideRef = useRef();

    
    useEffect(() => {
        if (splideRef.current) {
          splideRef.current.splide.refresh(); // refresh the slider after mounting to ensure proper initialization
          splideRef.current.splide.go('center'); // focus on the center element after the slider is fully rendered
        }
      }, []);

    const [artikel, setArtikel] = useState(
        [
            {
                id: 1,
                image: gambarNyelam,
                text: "5 Alasan Kita Orang Indonesia Perlu Belajar Menyelam"
            },
            {
                id: 2,
                image: gambarNyelam,
                text: "5 Alasan Kita Orang Indonesia Perlu Belajar Menyelam"
            },
            {
                id: 3,
                image: gambarNyelam,
                text: "5 Alasan Kita Orang Indonesia Perlu Belajar Menyelam"
            },
            {
                id: 4,
                image: gambarNyelam,
                text: "5 Alasan Kita Orang Indonesia Perlu Belajar Menyelam"
            },
        ]
    )

    useEffect(() => {
        if (page === 'artikel') {
            setArtikel(data)
        }
    }, [])

    const navigate = useNavigate()

    const openArtikel = (id) => {
        navigate(`/artikel/detail/${id}`)
    }
    return (
        <div className='location-beranda-container'>
            {
                page === 'artikel'
                    ?
                    null
                    :
                    <div className='location-beranda-title-container'>
                        <div className='location-beranda-title'>Artikel Terbaru</div>
                    </div>
            }

            <Splide options={settings} ref={splideRef}  aria-label="React Splide Example">
                {
                    artikel.map((item, index) => {
                        return (
                            <SplideSlide key={index} className="artikel-beranda-item-container" onClick={() => openArtikel(item.id)}>
                                <div className='artikel-beranda-item-content-container'>
                                    <img src={item.image} className='artikel-beranda-item-content-image' alt='artikel' />
                                    <div className='artikel-beranda-item-content-text-container'>
                                        <div className='artikel-beranda-item-content-text'>
                                            {item.text}
                                        </div>
                                    </div>
                                </div>
                            </SplideSlide>
                        )
                    })
                }
            </Splide>
        </div>
    )
}

export default ArtikelBeranda