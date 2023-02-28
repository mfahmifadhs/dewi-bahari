import Banner from '../../components/Banner'
import Footer from '../../components/Footer'
import NavBar2 from '../../components/Navbar2'
import './style.css'
import bannerKKP from '../../Assets/Images/banner-kkp.png'
import { useState } from 'react'

const Tentang = () => {
    const [pageData, setPageData] = useState([
        {
            image: bannerKKP
        },
        {
            image: bannerKKP
        },
        {
            image: bannerKKP
        },
    ])
    return (
        <>
            <NavBar2 />
            <div className="page-content-container">
                <Banner pageData={pageData} />
                <div className="content-container">
                    <div className='location-beranda-container'>
                        <div className='location-beranda-title-container'>
                            <div className='location-beranda-title'>Desa Wisata Bahari</div>
                        </div>
                        {/* <div className='tentang-text-container'>
                            <div className='location-beranda-title'>Desa Wisata Bahari</div>
                        </div> */}
                        <div className='tentang-text-container'>
                            <div className='tentang-text'>
                                Ruang laut serta sumberdaya kelautan dan perikanan beserta ekosistemnya perlu dikelola dengan baik sehingga dapat memberi manfaat secara berkelanjutan. Pola pemanfaatan yang dilakukan bukan hanya memanfaatkan sumberdaya yang ada, tetapi bagaimana jasa sumberdaya pesisir dan laut dapat memberikan dampakoptimal untuk peningkatan kesejahteraan dengan tetap menjaga keberlanjutan agar sumberdaya tetap lestari.
                            </div>
                            <br />
                            <div className='tentang-text'>
                                Adalah Program Desa Wisata Bahari (Dewi Bahari) yang digagas Direktorat Jenderal Pengelolaan Ruang Laut (DJ PRL) Kementerian Kelautan dan Perikanan (KKP). Sebuah program pengelolaan kelestarian sumberdaya kelautan dan perikanan beserta ekosistemnya melalui pemanfaatan jasa yang berprinsip pada keberlanjutan peningkatan ekonomi masyarakat, pelestarian budaya maritim dan kearifan lokal.
                            </div>
                            <br />
                            <div className='tentang-text'>
                                Program Dewi Bahari diluncurkan untuk memberikan peluang usaha agar desa mampu mengembangkan potensi yang dimilikinya dengan konsep Community Based Tourism (CBT). Pengelolaannya diberikan kepada masyarakat karena masyarakatlah yang lebih tahu potensi yang dimiliki.
                            </div>
                            <br />
                            <div className='tentang-text'>
                                Masyarakat sendiri yang merencanakan, mengelola dan memonitor perkembangannya. Sementara pemerintah pusat dan daerah melakukan pendampingan dan pembinaan. Hal ini dilakukan agar menumbuhkan kesadaran dan tanggungjawab masyarakat terhadap ekosistem dan lingkungannya sebagai sumberdaya yang dikelola untuk kesejahteraannya.
                            </div>
                            <br />
                            <div className='tentang-text'>
                                Pemerintah berupaya mendorong sense of belonging atau rasa memiliki terhadap program Dewi Bahari di kalangan masyarakat dan diharapkan sertai sense of responsibility, berupa tanggung jawab yang berkelanjutan.
                            </div>
                            <br />
                            <div className='tentang-text'>
                                Kehadiran program Dewi Bahari, telah diperkuat dengan regulasi, melalui penetapan Peraturan Menteri Kelautan dan Perikanan No. 93 tahun 2020 tentang Desa Wisata Bahari. Program ini sejalan dengan Program Pembangunan Desa melalui Dana Desa, dimana Pemerintah sejak tahun 2015-2021 telah mengucurkan aggaran kurang lebih sebesar Rp400,65 triliun. Sementara pada tahun 2022 Pemerintah mengucurkan Dana Desa sebesar Rp 68 triliun.
                            </div>
                        </div>
                    </div>

                    <div className='tentang-content-container'>
                        <div className='tentang-text-container'>
                            <div className='location-beranda-title'>Tujuan Dewi Bahari</div>
                        </div>
                        <div className='tentang-text-container'>
                            <div className='tentang-text'>
                                Lorem ipsum dolor sit amet consectetur. Egestas elementum elementum laoreet lacus platea. A risus consectetur malesuada sed molestie faucibus. Potenti sit adipiscing dis vulputate magna ac dui eget sagittis. Ornare consectetur sem imperdiet interdum. Vulputate neque neque adipiscing at diam in diam. Turpis malesuada vitae ac leo. Faucibus diam risus ipsum pulvinar odio ultrices. Sollicitudin fermentum scelerisque nunc lectus. Donec dolor egestas mauris morbi accumsan. Pellentesque phasellus id et ultrices malesuada.
                            </div>
                            <br />
                            <div className='tentang-text'>
                                Amet sed accumsan lobortis condimentum proin blandit quam lacus. Risus sed sed viverra odio vel consectetur ipsum. Viverra mattis quis feugiat turpis convallis tempus. Sem pharetra morbi scelerisque posuere ipsum phasellus. Id metus tincidunt tortor at etiam tincidunt diam. Est in eget enim adipiscing ac neque cursus auctor auctor. Sit viverra auctor aliquet vulputate sit sollicitudin. Sed massa maecenas egestas metus eu nunc ullamcorper quisque. Iaculis condimentum mi enim feugiat ultrices amet odio. Lorem lacus nisi sed eros massa venenatis sed.
                            </div>
                        </div>
                    </div>

                    <div className='tentang-content-container'>
                        <div className='tentang-text-container'>
                            <div className='location-beranda-title'>Proses Bisnis</div>
                        </div>
                        <div className='tentang-text-container'>
                            <div className='tentang-text'>
                                Lorem ipsum dolor sit amet consectetur. Egestas elementum elementum laoreet lacus platea. A risus consectetur malesuada sed molestie faucibus. Potenti sit adipiscing dis vulputate magna ac dui eget sagittis. Ornare consectetur sem imperdiet interdum. Vulputate neque neque adipiscing at diam in diam. Turpis malesuada vitae ac leo. Faucibus diam risus ipsum pulvinar odio ultrices. Sollicitudin fermentum scelerisque nunc lectus. Donec dolor egestas mauris morbi accumsan. Pellentesque phasellus id et ultrices malesuada.
                            </div>
                            <br />
                            <div className='tentang-text'>
                                Amet sed accumsan lobortis condimentum proin blandit quam lacus. Risus sed sed viverra odio vel consectetur ipsum. Viverra mattis quis feugiat turpis convallis tempus. Sem pharetra morbi scelerisque posuere ipsum phasellus. Id metus tincidunt tortor at etiam tincidunt diam. Est in eget enim adipiscing ac neque cursus auctor auctor. Sit viverra auctor aliquet vulputate sit sollicitudin. Sed massa maecenas egestas metus eu nunc ullamcorper quisque. Iaculis condimentum mi enim feugiat ultrices amet odio. Lorem lacus nisi sed eros massa venenatis sed.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Tentang