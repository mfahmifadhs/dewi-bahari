import { useState } from 'react'
import Footer from '../../../components/Footer'
import NavBar2 from '../../../components/Navbar2'
import './style.css'
import penyu from '../../../Assets/Images/payung.png'
import { Pagination } from '../../../components/Pagination'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { DefaultPlayer as VideoPlayer } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import demoVideo from '../../../Assets/video/safe.mp4'

const Video = () => {
    const settings = {
        // type: 'loop',
        gap: '620px',
        // perPage: 3,
        perMove: 1,
        focus: 'center',
        width: '100vw',
        overflow: 'hidden',
        classes: {
            pagination: 'splide__pagination video_pagination',
            page: 'splide__pagination__page video_pagination_page',
            arrow: 'splide__arrow video_arrow',
        }
    };

    const [data, setData] = useState([
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            url: demoVideo,
            picture: penyu,
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            url: demoVideo,
            picture: penyu,
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            url: demoVideo,
            picture: penyu,
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            url: demoVideo,
            picture: penyu,
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            url: demoVideo,
            picture: penyu,
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            url: demoVideo,
            picture: penyu,
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            url: demoVideo,
            picture: penyu,
        },
    ])

    // const [currentPage, setCurrentPage] = useState(1)
    // const [postsPerPage, setPostsPerPage] = useState(9)

    // const lastPostIndex = currentPage * postsPerPage
    // const firstPostIndex = lastPostIndex - postsPerPage
    // const currentPosts = data.slice(firstPostIndex, lastPostIndex)

    // const [pauseStatus, setPauseStatus] = useState(true)

    return (
        <>
            <NavBar2 />
            <div className="page-content-container">
                <div className="content-container">
                    <div className='profil-title-container'>
                        <div className='profil-title-text'>
                            Galeri
                        </div>
                    </div>
                    <div className='photo-sub-menu'>
                        Video
                    </div>
                    <div className='video-container'>
                        <Splide options={settings} aria-label="React Splide Example">
                            {
                                data.map((item, index) => {
                                    return (
                                        <SplideSlide key={index} className="video-item-container">
                                            <div className='video-item-content-container'>
                                                <VideoPlayer className='video-item-content-image'
                                                    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                                                    poster={item.picture}
                                                    // onPause={()=>setPauseStatus(true)}
                                                    // onPlay={()=>setPauseStatus(false)}
                                                    onCanPlayThrough={() => {
                                                        // Do stuff
                                                    }}>
                                                    <source src={item.url} type="video/mp4" />
                                                </VideoPlayer>
                                                {/* <img src={item.picture} className='video-item-content-image' alt='video' /> */}
                                                <div className='video-item-content-text-container'>
                                                    <div className='video-item-content-text'>
                                                        {item.title}
                                                    </div>
                                                    <div className='video-item-content-text-address'>
                                                        {item.address}
                                                    </div>
                                                </div>
                                            </div>
                                        </SplideSlide>
                                    )
                                })
                            }
                        </Splide>
                        {/* <div className='photo-card-container'>
                            {
                                currentPosts.map((item, index) => {
                                    return (
                                        <div className='photo-item-box'>
                                            <div key={index} className='photo-item-containter' style={{ backgroundImage: `url(${item.picture})` }}>
                                                <div className='profil-item'>
                                                    <div className='profil-item-text-title'>
                                                        {item.title}
                                                    </div>
                                                    <div className='profil-item-text-address'>
                                                        {item.address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div> */}
                        {/* <Pagination totalPosts={data.length} postsPerPage={postsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
                    </div>
                    <div className='profil-card-container'>
                        {
                            data.map((item, index) => {
                                return (
                                    <div className='video-list-item-content-container'>
                                        <img src={item.picture} className='video-list-item-content-image' alt='video' />
                                        <div className='video-list-item-content-text-container'>
                                            <div className='video-list-item-content-text'>
                                                {item.title}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Video