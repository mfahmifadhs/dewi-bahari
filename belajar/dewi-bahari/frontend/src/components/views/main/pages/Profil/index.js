import { useState } from 'react'
import Footer from '../../components/Footer'
import NavBar2 from '../../components/Navbar2'
import './style.css'
import penyu from '../../Assets/Images/payung.png'
import { useNavigate } from 'react-router-dom'


const Profil = () => {
    const [data, setData] = useState([
        {
            id: 1,
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            id: 2,
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            id: 3,
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            id: 4,
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            id: 5,
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            id: 6,
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            id: 7,
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
        {
            id: 8,
            title: "Payung-Payung",
            address: "Kalimantan Timur",
            picture: penyu
        },
    ])

    const navigate = useNavigate()

    const detailProfil = (id) => {
        navigate(`/profil/detail/${id}`)
    }
    return (
        <>
            <NavBar2 />
            <div className="page-content-container">
                <div className="content-container">
                    <div className='profil-title-container'>
                        <div className='profil-title-text'>
                            Desa Wisata
                        </div>
                    </div>
                    <div className='profil-card-container'>
                        {
                            data.map((item, index) => {
                                return (
                                    <div className='profil-item-box' onClick={() => detailProfil(item.id)}>
                                        <div key={index} className='profil-item-containter' style={{ backgroundImage: `url(${item.picture})` }}>
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
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profil