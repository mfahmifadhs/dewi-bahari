import React from 'react'
import Banner from '../../components/Banner'
import Footer from '../../components/Footer'
import NavBar2 from '../../components/Navbar2'
import './style.css'
import bannerKKP from '../../Assets/Images/banner-kkp.png'
import { useState } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import penyu from '../../Assets/Images/payung.png'
import { useNavigate } from 'react-router-dom'

const ArtikelDetail = () => {
  const [pageData, setPageData] = useState([
    {
      image: bannerKKP,
    },
  ])

  const [detailArtikel, setDetailArtikel] = useState({
    title: '5 Alasan Kita Orang Indonesia Perlu Belajar Menyelam',
    date: '28 Juli 2021',
    content:
      'Sudah pada bisa menyelam, belum? Yang bilang takut sama air, sudahlah tidak usah cemen! Sehari-hari minum air sampai dua liter, mandi pake sabun air bisa sampai 191,61 liter sehari, dan komposisi tubuh orang dewasa seperti kita 43 – 73% itu cairan.Sementara negeri tercinta, perairannya tidak tanggung-tanggung, 6.400.000 km2, hanya menyisakan 22,9% daratan. Air menjadi bagian dari kita, bagaimana bisa takut. “Takut tenggelam,” kata seorang teman. Ayolah, kalau menyelam kan memang mesti tenggelam. Kalau tidak tenggelam itu berperahu namanya.Di antara hal esensial kaitan kita dengan air, saya secara khusus ingin menggarisbawahi poin luasnya laut kita hingga 77,1%. Dengan dominasi seperti itu, wajiblah rasanya untuk mengenali bagian terbesar rumah Indonesia ini.Terdengar terlalu menyederhanakan mengaitkan selam dan mengenali kekayaan milik bangsa memang, tapi itulah interaksi langsung yang bisa anda lakukan untuk berkenalan lebih jauh. Bahwa selanjutnya anda memutuskan untuk mencintai trus menjaga laut, itu kita urus belakangan saja.Berdasarkan pengalaman 15 tahun menjadikan selam sebagai hobi, saya ingin mengiming-imingi anda semua untuk memupuk alasan, kenapa perlu belajar menyelam?',
    article: [
      {
        id: 1,
        image: penyu,
        title: 'Wisata Bahari Dukung BBWI',
      },
      {
        id: 2,
        image: penyu,
        title: 'Taman Laut Penari, Destinasi Selam Masa Depan Tanjung Benoa Bali',
      },
      {
        id: 3,
        image: penyu,
        title: '5 Alasan Kita Orang Indonesia Perlu Belajar Menyelam',
      },
      {
        id: 4,
        image: penyu,
        title: 'Wisata Bahari Dukung BBWI',
      },
      {
        id: 5,
        image: penyu,
        title: 'Wisata Bahari Dukung BBWI',
      },
    ],
  })

  const settings = {
    // type: 'loop',
    gap: '20px',
    perPage: 3,
    perMove: 1,
    width: '100%',
    overflow: 'hidden',
    classes: {
      pagination: 'splide__pagination artikel_detail_pagination',
      page: 'splide__pagination__page artikel_detail_pagination_page',
      arrow: 'splide__arrow artikel_detail_arrow',
    },
  }
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
          <div className="artikel-detail-content-container">
            <div className="artikel-detail-content-title">{detailArtikel.title}</div>
            <div className="artikel-detail-content-text">{detailArtikel.date}</div>
            <div
              className="artikel-detail-content-text"
              dangerouslySetInnerHTML={{ __html: detailArtikel.content }}
            />
          </div>
          <div className="artikel-detail-lokasi-container">
            <div className="artikel-detail-content-sub-title">Artikel Terkait</div>
            <div className="detail-profil-card-container">
              <Splide
                options={{ ...settings, pagination: false, type: 'loop' }}
                aria-label="React Splide Example"
              >
                {detailArtikel.article.map((item, index) => {
                  return (
                    <SplideSlide key={index}>
                      <div
                        className="detail-profil-item-box-artikel"
                        onClick={() => openArtikel(item.id)}
                      >
                        <div className="detail-image-container">
                          <img key={index} className="detail-profil-image" src={item.image} />
                        </div>
                        <div className="detail-profil-item-article">
                          <div className="detail-profil-item-text-title-article">{item.title}</div>
                        </div>
                      </div>
                    </SplideSlide>
                  )
                })}
              </Splide>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ArtikelDetail
