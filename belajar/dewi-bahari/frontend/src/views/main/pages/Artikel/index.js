import { useState } from 'react'
import Footer from '../../components/Footer'
import NavBar2 from '../../components/Navbar2'
import './style.css'
import penyu from '../../Assets/Images/payung.png'
import ArtikelBeranda from '../../components/ArtikelBeranda'
import { Pagination } from '../../components/Pagination'
import gambarNyelam from "../../Assets/Images/nyelam.jpg"
import { useNavigate } from 'react-router-dom'


const Artikel = () => {
    const [data, setData] = useState([
        {
            id:1,
            image: gambarNyelam,
            text: "15 Alasan Kita Orang Indonesia Perlu Belajar Menyelam",
            desc: "Sudah pada bisa menyelam, belum? Yang bilang takut sama air, sudahlah tidak usah cemen! Sehari-hari minum air sampai dua liter, mandi pake sabun air bisa sampai 191,61 liter sehari, dan komposisi tubuh orang dewasa seperti kita 43 – 73% itu cairan."
        },
        {
            id:2,
            image: gambarNyelam,
            text: "25 Alasan Kita Orang Indonesia Perlu Belajar Menyelam",
            desc: "Sudah pada bisa menyelam, belum? Yang bilang takut sama air, sudahlah tidak usah cemen! Sehari-hari minum air sampai dua liter, mandi pake sabun air bisa sampai 191,61 liter sehari, dan komposisi tubuh orang dewasa seperti kita 43 – 73% itu cairan."
        },
        {
            id:3,
            image: gambarNyelam,
            text: "35 Alasan Kita Orang Indonesia Perlu Belajar Menyelam",
            desc: "Sudah pada bisa menyelam, belum? Yang bilang takut sama air, sudahlah tidak usah cemen! Sehari-hari minum air sampai dua liter, mandi pake sabun air bisa sampai 191,61 liter sehari, dan komposisi tubuh orang dewasa seperti kita 43 – 73% itu cairan."
        },
        {
            id:4,
            image: gambarNyelam,
            text: "45 Alasan Kita Orang Indonesia Perlu Belajar Menyelam",
            desc: "Sudah pada bisa menyelam, belum? Yang bilang takut sama air, sudahlah tidak usah cemen! Sehari-hari minum air sampai dua liter, mandi pake sabun air bisa sampai 191,61 liter sehari, dan komposisi tubuh orang dewasa seperti kita 43 – 73% itu cairan."
        },
        {
            id:5,
            image: gambarNyelam,
            text: "55 Alasan Kita Orang Indonesia Perlu Belajar Menyelam",
            desc: "Sudah pada bisa menyelam, belum? Yang bilang takut sama air, sudahlah tidak usah cemen! Sehari-hari minum air sampai dua liter, mandi pake sabun air bisa sampai 191,61 liter sehari, dan komposisi tubuh orang dewasa seperti kita 43 – 73% itu cairan."
        },
        {
            id:6,
            image: gambarNyelam,
            text: "5 Alasan Kita Orang Indonesia Perlu Belajar Menyelam",
            desc: "Sudah pada bisa menyelam, belum? Yang bilang takut sama air, sudahlah tidak usah cemen! Sehari-hari minum air sampai dua liter, mandi pake sabun air bisa sampai 191,61 liter sehari, dan komposisi tubuh orang dewasa seperti kita 43 – 73% itu cairan."
        },
        {
            id:7,
            image: gambarNyelam,
            text: "5 Alasan Kita Orang Indonesia Perlu Belajar Menyelam",
            desc: "Sudah pada bisa menyelam, belum? Yang bilang takut sama air, sudahlah tidak usah cemen! Sehari-hari minum air sampai dua liter, mandi pake sabun air bisa sampai 191,61 liter sehari, dan komposisi tubuh orang dewasa seperti kita 43 – 73% itu cairan."
        },
        {
            id:8,
            image: gambarNyelam,
            text: "5 Alasan Kita Orang Indonesia Perlu Belajar Menyelam",
            desc: "Sudah pada bisa menyelam, belum? Yang bilang takut sama air, sudahlah tidak usah cemen! Sehari-hari minum air sampai dua liter, mandi pake sabun air bisa sampai 191,61 liter sehari, dan komposisi tubuh orang dewasa seperti kita 43 – 73% itu cairan."
        },
        {
            id:9,
            image: gambarNyelam,
            text: "5 Alasan Kita Orang Indonesia Perlu Belajar Menyelam",
            desc: "Sudah pada bisa menyelam, belum? Yang bilang takut sama air, sudahlah tidak usah cemen! Sehari-hari minum air sampai dua liter, mandi pake sabun air bisa sampai 191,61 liter sehari, dan komposisi tubuh orang dewasa seperti kita 43 – 73% itu cairan."
        },
        {
            id:10,
            image: gambarNyelam,
            text: "5 Alasan Kita Orang Indonesia Perlu Belajar Menyelam",
            desc: "Sudah pada bisa menyelam, belum? Yang bilang takut sama air, sudahlah tidak usah cemen! Sehari-hari minum air sampai dua liter, mandi pake sabun air bisa sampai 191,61 liter sehari, dan komposisi tubuh orang dewasa seperti kita 43 – 73% itu cairan."
        },
    ])

    const [artikelTerbaru, setArtikelTerbaru] = useState(data.slice(0, 5))
    const [artikelLainnya, setArtikelLainnya] = useState(data.slice(5))

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(6)

    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = artikelLainnya.slice(firstPostIndex, lastPostIndex)

    const navigate = useNavigate()

    const openArtikel = (id) => {
        navigate(`/artikel/detail/${id}`)
    }
    return (
        <>
            <NavBar2 />
            <div className="page-content-container">
                <div className="content-container">
                    <div className='profil-title-container'>
                        <div className='profil-title-text'>
                            Artikel Terbaru
                        </div>
                    </div>
                    <ArtikelBeranda page={'artikel'} data={artikelTerbaru} />
                    <div className='artikel-sub-title'>
                        Artikel lainnya
                    </div>
                    <div className='profil-card-container'>
                        {
                            currentPosts.map((item, index) => {
                                return (
                                    <div key={index} className='artikel-item-content-container' onClick={() => openArtikel(item.id)}>
                                        <img src={item.image} className='artikel-item-content-image' alt='video' />
                                        <div className='artikel-item-content-text-container'>
                                            <div className='artikel-item-content-text'>
                                                {item.text}
                                            </div>
                                            <div className='artikel-item-content-text-desc'>
                                                {item.desc}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <Pagination totalPosts={artikelLainnya.length} postsPerPage={postsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Artikel