import './style.css'
import penyu from '../../Assets/Images/payung.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LocationBeranda = () => {
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
    ])

    const navigate = useNavigate()

    const detailProfil = (id) => {
        navigate(`/profil/detail/${id}`)
    }


    return (
        <div className='location-beranda-container'>
            <div className='location-beranda-title-container'>
                <div className='location-beranda-title'>Lokasi Pilihan</div>
            </div>
            <div className='location-beranda-card-container'>
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
            {/* <div className='location-beranda-item'>
                <div className='location-beranda-item-text-title'>
                    Payung-Payung
                </div>
                <div className='location-beranda-item-text-address'>
                    Kalimantan Timur
                </div>

            </div> */}
        </div>
    )
}

export default LocationBeranda