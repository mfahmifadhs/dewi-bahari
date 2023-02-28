import { useState } from 'react'
import Footer from '../../components/Footer'
import NavBar2 from '../../components/Navbar2'
import './style.css'
import logoPemKab from '../../Assets/Images/logo-pemkab.png'

const Mitra = () => {
    const [data, setData] = useState([
        {
            title: "Kementrian / Lembaga",
            desc: "Lorem ipsum dolor sit amet consectetur. In porta cursus neque sollicitudin tellus erat. At eget tincidunt erat scelerisque volutpat sed ac suspendisse viverra. Tristique nulla posuere ornare a facilisis sed. Mollis elit in at massa duis quam. Viverra proin facilisis malesuada euismod id sed vitae. Pharetra convallis sagittis eleifend cursus porttitor duis odio vel. Auctor pellentesque libero libero ut pharetra congue ultricies blandit. Montes eget bibendum amet mauris malesuada. Gravida gravida sapien amet eget sed ornare id lorem. Lacus purus leo neque nulla volutpat in. At libero enim sagittis felis. Ante id augue nunc nisi aliquam fringilla duis aliquam. Bibendum vitae amet quis tincidunt consequat viverra vel lorem. Eu iaculis eget sit lacinia in ullamcorper consequat. Nam at nulla eu felis et velit pellentesque. Tellus sem fusce tellus risus id mauris sit rutrum. Vel fringilla et varius sit tristique diam accumsan fringilla eu. Non nullam gravida vel sed tortor donec. Aliquet nisi pharetra lobortis nec maecenas mauris eleifend. Mauris risus in etiam nibh amet ut eget. Dictum massa scelerisque nulla vitae montes in purus dolor. Consequat tortor et ligula pellentesque quis ullamcorper. Accumsan tortor facilisis diam amet. Libero etiam tellus eu pharetra nulla eu fames lectus. Id gravida parturient quisque aliquam dictum turpis turpis. Platea est felis suspendisse accumsan. Duis enim etiam diam felis turpis ac varius mi."
        },
        {
            title: "Pemerintah Daerah",
            image: [logoPemKab, logoPemKab, logoPemKab, logoPemKab, logoPemKab]
        },
        {
            title: "Non-Government Organization",
            image: [logoPemKab, logoPemKab, logoPemKab, logoPemKab, logoPemKab]
        },
        {
            title: "Private Sector",
            image: [logoPemKab, logoPemKab, logoPemKab, logoPemKab, logoPemKab]
        },

    ])
    return (
        <>
            <NavBar2 />
            <div className="page-content-container">
                <div className="content-container">
                    <div className='profil-title-container'>
                        <div className='profil-title-text'>
                            Mitra
                        </div>
                    </div>
                    <div className='mitra-all-content-container'>
                        {
                            data.map((item) => {
                                if (item.title === 'Kementrian / Lembaga') {
                                    return (
                                        <div className='mitra-text-container'>
                                            <div className='mitra-title-text'>{item.title}</div>
                                            <div className='mitra-text'>
                                                {item.desc}
                                            </div>
                                        </div>
                                    )
                                } else if (item.title === 'Pemerintah Daerah') {
                                    return (
                                        <div className='mitra-content-container'>
                                            <div className='mitra-title-center'>
                                                {item.title}
                                            </div>
                                            <div className='mitra-logo-container'>
                                                {
                                                    item.image.map((logo) => {
                                                        return (
                                                            <img src={logo} className='mitra-logo' />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                } else if (item.title === 'Non-Government Organization') {
                                    return (
                                        <div className='mitra-content-container'>
                                            <div className='mitra-title-center'>
                                                {item.title}
                                            </div>
                                            <div className='mitra-logo-container'>
                                                {
                                                    item.image.map((logo) => {
                                                        return (
                                                            <img src={logo} className='mitra-logo' />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                } else if (item.title === 'Private Sector') {
                                    return (
                                        <div className='mitra-content-container'>
                                            <div className='mitra-title-center'>
                                                {item.title}
                                            </div>
                                            <div className='mitra-logo-container'>
                                                {
                                                    item.image.map((logo) => {
                                                        return (
                                                            <img src={logo} className='mitra-logo' />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Mitra