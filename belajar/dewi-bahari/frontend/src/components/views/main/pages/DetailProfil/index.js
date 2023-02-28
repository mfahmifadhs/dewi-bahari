import { useState } from 'react'
import Banner from '../../components/Banner'
import Footer from '../../components/Footer'
import NavBar2 from '../../components/Navbar2'
import './style.css'
import banner2 from '../../Assets/Images/banner-2.jpg'
import logoMdi from '../../Assets/Images/logo-mdiweb.png'
import logoInstagram from '../../Assets/Images/logo-instagram.png'
import penyu from '../../Assets/Images/payung.png'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useNavigate } from 'react-router-dom'

const DetailProfil = () => {
    const [pageData, setPageData] = useState([
        {
            image: banner2
        },
        {
            image: banner2
        },
        {
            image: banner2
        },
    ])

    const [detailLokasi, setDetailLokasi] = useState({
        title: "Buku Limau",
        address: "Kabupaten Belitung Timur, Bangka Belitung",
        class: "Kelas 2",
        desc: "Lorem ipsum dolor sit amet consectetur. Volutpat phasellus commodo diam lectus enim eu quis faucibus. Purus sit dolor diam cursus vitae nec nascetur. Netus blandit consectetur aliquam habitant cursus. Quisque feugiat ornare purus vel id in mauris egestas velit. Aliquam non diam tellus enim suspendisse. Amet aliquet at mattis fermentum. Placerat ac arcu lorem vestibulum. Id enim sed libero placerat gravida leo in id amet. Aliquam elementum sed et sit ultricies nulla dolor blandit. Sit nulla sapien amet felis sit adipiscing fermentum.Nunc etiam pharetra egestas lectus. Dolor lacinia vitae tempor vitae. Eget vivamus porta mi eleifend molestie id tempor dui. Nunc quis cursus a consequat in mollis est. Feugiat tincidunt porta sit massa massa ut dui. Blandit dapibus nibh est non. Ac non nec purus aliquet enim habitant. Erat amet quisque urna ut. Non consectetur nibh gravida amet neque. Nulla eget vitae adipiscing hendrerit. Netus nibh orci eleifend posuere accumsan id tempus tellus. Ante vel placerat vitae ac metus aenean tincidunt augue augue. Tincidunt elementum purus lobortis pellentesque integer ut adipiscing.Elementum adipiscing condimentum donec tellus ac. Venenatis erat quisque nullam libero elementum quam risus fermentum quis. Magna mollis imperdiet ipsum venenatis. Et dis id gravida sed proin malesuada urna. Sit facilisi varius egestas a senectus. Rutrum ornare eget iaculis mi felis diam id. Cras donec bibendum auctor rutrum faucibus. Feugiat id non interdum sit amet.",
        googleAddress: "Jl. Sungai Beting Rt. 01/05 Dk. Pandansari, Desa. Kaliwlingi, Kec/Kab. Brebes, 52219",
        contactName: "Nama Admin",
        contactPhone: "091232312312",
        webAddress: "www.website.com",
        instagram: "tes",
        embedMap: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6664270097594!2d106.82496411400341!3d-6.175392395529184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sNational%20Monument!5e0!3m2!1sen!2sid!4v1676725734802!5m2!1sen!2sid" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        fasility: ["fasilitas 1", "fasilitas 2", "fasilitas 3", "fasilitas 3"],
        show: [
            {
                id:1,
                image: penyu,
                title: "Wisata Penyu"
            },
            {
                id:1,
                image: penyu,
                title: "Wisata Penyu"
            },
            {
                id:1,
                image: penyu,
                title: "Wisata Penyu"
            },
            {
                id:1,
                image: penyu,
                title: "Wisata Penyu"
            },
            {
                id:1,
                image: penyu,
                title: "Wisata Penyu"
            },
        ],
        manager: ["pengelola 1", "pengelola 2", "pengelola 3", "pengelola 3"],
        article: [
            {
                id:1,
                image: penyu,
                title: "Wisata Bahari Dukung BBWI"
            },
            {
                id:1,
                image: penyu,
                title: "Taman Laut Penari, Destinasi Selam Masa Depan Tanjung Benoa Bali"
            },
            {
                id:1,
                image: penyu,
                title: "5 Alasan Kita Orang Indonesia Perlu Belajar Menyelam"
            },
            {
                id:1,
                image: penyu,
                title: "Wisata Bahari Dukung BBWI"
            },
            {
                id:1,
                image: penyu,
                title: "Wisata Bahari Dukung BBWI"
            },
        ],
    })

    const [showFullText, setShowFullText] = useState(false)

    const handleClick = () => {
        setShowFullText(!showFullText);
    }
    const settings = {
        // type: 'loop',
        gap: '20px',
        perPage: 3,
        perMove: 1,
        // focus: 'center',
        width: '100%',
        overflow: 'hidden',
        // pagination: false,
        classes: {
            pagination: 'splide__pagination detail_profil_pagination',
            page: 'splide__pagination__page detail_profil_pagination_page',
            arrow: 'splide__arrow detail_profil_arrow',

        }
    };

    const navigate = useNavigate()

    const openArtikel = (id) => {
        navigate(`/artikel/detail/${id}`)
    }
    return (
        <>
            <NavBar2 />
            <div className="page-content-container">
                <Banner pageData={pageData} />
                <div className="content-container">
                    <div className='detail-profil-container'>
                        <div className='detail-profil-title-text'>
                            {detailLokasi.title}
                        </div>
                        <div className='detail-profil-address-text'>
                            {detailLokasi.address}
                        </div>
                        <div className='detail-profil-class-text'>
                            {detailLokasi.class}
                        </div>
                    </div>
                    <div className='detail-profil-desc-container'>
                        <div className={`detail-profil-desc ${showFullText ? 'full-text' : ''}`}>
                            <div dangerouslySetInnerHTML={{ __html: detailLokasi.desc }} />
                        </div>
                        <div className='detail-profil-desc-button' onClick={handleClick}>
                            <div className='detail-profil-desc-button-text'>
                                {showFullText ? 'Tampilkan lebih sedikit' : 'Tampilkan semua'}
                            </div>
                        </div>
                    </div>
                    <div className='detail-profil-lokasi-container'>
                        <div className='detail-sub-header-text'>
                            Lokasi
                        </div>
                        <div className='detail-profil-lokasi-map-container'>
                            <div className='detail-profil-lokasi-map' dangerouslySetInnerHTML={{ __html: detailLokasi.embedMap }} />
                            <div className='detail-profil-lokasi-map-detail-container'>
                                <div className='detail-profil-lokasi-map-detail-address'>
                                    {detailLokasi.googleAddress}
                                </div>
                                <div className='detail-profil-lokasi-map-detail-contact-container'>
                                    <div className='detail-profil-lokasi-map-detail-sub-title'>
                                        Contact
                                    </div>
                                    <div className='detail-profil-lokasi-map-detail-text'>
                                        {detailLokasi.contactName}
                                    </div>
                                    <div className='detail-profil-lokasi-map-detail-text'>
                                        {detailLokasi.contactPhone}
                                    </div>
                                </div>
                                <div className='detail-profil-lokasi-map-detail-contact-container'>
                                    <div className='detail-profil-lokasi-map-detail-sub-title'>
                                        Social Media
                                    </div>
                                    <div className='detail-profil-lokasi-map-sosmed-container'>
                                        <img src={logoMdi} className='detail-profil-lokasi-map-sosmed-icon' />
                                        <a href={`https://${detailLokasi.webAddress}`} className='detail-profil-lokasi-map-detail-text'>
                                            {detailLokasi.webAddress}
                                        </a>
                                    </div>
                                    <div className='detail-profil-lokasi-map-sosmed-container'>
                                        <img src={logoInstagram} className='detail-profil-lokasi-map-sosmed-icon' />
                                        <a href={`https://www.instagram.com/${detailLokasi.instagram}`} className='detail-profil-lokasi-map-detail-text'>
                                            {detailLokasi.instagram}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='detail-profil-lokasi-container'>
                        <div className='detail-sub-header-text'>
                            Fasilitas
                        </div>
                        <ul className='horizontal-list'>
                            {
                                detailLokasi.fasility.map((item) => {
                                    return (
                                        <li className='detail-profil-lokasi-map-detail-text capitalize'>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className='detail-profil-lokasi-container'>
                        <div className='detail-sub-header-text'>
                            Atraksi Wisata
                        </div>
                        <div className='detail-profil-card-container'>
                            <Splide options={settings} aria-label="React Splide Example">
                                {
                                    detailLokasi.show.map((item, index) => {
                                        return (
                                            <SplideSlide>
                                                <div className='detail-profil-item-box'>
                                                    <div key={index} className='detail-profil-item-containter' style={{ backgroundImage: `url(${item.image})` }}>
                                                        <div className='detail-profil-item'>
                                                            <div className='detail-profil-item-text-title'>
                                                                {item.title}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SplideSlide>
                                        )
                                    })
                                }
                            </Splide>
                        </div>
                    </div>
                    <div className='detail-profil-lokasi-container'>
                        <div className='detail-sub-header-text'>
                            Foto dan Video
                        </div>
                        <div className='detail-profil-card-container'>
                            <Splide options={settings} aria-label="React Splide Example">
                                {
                                    detailLokasi.show.map((item, index) => {
                                        return (
                                            <SplideSlide className='detail-profil-item-box'>
                                                <div key={index} className='detail-profil-item-containter' style={{ backgroundImage: `url(${item.image})` }}>
                                                </div>
                                            </SplideSlide>
                                        )
                                    })
                                }
                            </Splide>
                        </div>
                    </div>
                    <div className='detail-profil-lokasi-container'>
                        <div className='detail-sub-header-text'>
                            Pengelola
                        </div>
                        <ul >
                            {
                                detailLokasi.manager.map((item) => {
                                    return (
                                        <li className='detail-profil-lokasi-map-detail-text capitalize'>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className='detail-profil-lokasi-container'>
                        <div className='detail-sub-header-text'>
                            Artikel Terkait
                        </div>
                        <div className='detail-profil-card-container'>
                            <Splide options={{...settings, pagination:false, type:'loop'}} aria-label="React Splide Example">
                                {
                                    detailLokasi.article.map((item, index) => {
                                        return (
                                            <SplideSlide>
                                                <div className='detail-profil-item-box-artikel' onClick={() => openArtikel(item.id)}>
                                                    <div className='detail-image-container'>
                                                        <img key={index} className='detail-profil-image' src={item.image} />
                                                    </div>
                                                        <div className='detail-profil-item-article'>
                                                            <div className='detail-profil-item-text-title-article'>
                                                                {item.title}
                                                            </div>
                                                        </div>
                                                </div>
                                            </SplideSlide>
                                        )
                                    })
                                }
                            </Splide>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DetailProfil