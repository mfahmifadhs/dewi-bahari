import { useState } from 'react'
import Footer from '../../../components/Footer'
import NavBar2 from '../../../components/Navbar2'
import './style.css'
import penyu from '../../../Assets/Images/payung.png'
import { Pagination } from '../../../components/Pagination'

const Photo = () => {
    const [data, setData] = useState([
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
    ])

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(9)

    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = data.slice(firstPostIndex, lastPostIndex)

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
                        Photo
                    </div>
                    <div className='photo-content-all'>
                        <div className='photo-card-container'>
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
                        </div>
                        <Pagination totalPosts={data.length} postsPerPage={postsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Photo