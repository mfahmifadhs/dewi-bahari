import './style.css'
import NavBar2 from "../../components/Navbar2"
import Banner from "../../components/Banner";
import LocationBeranda from "../../components/LocationBeranda";
import MapBeranda from "../../components/MapBeranda";
import ArtikelBeranda from "../../components/ArtikelBeranda";
import Footer from "../../components/Footer";
import { Helmet } from 'react-helmet';
import DewiFooterLogo from '../../Assets/Images/logo-dewi-footer.png'
import bannerKKP from '../../Assets/Images/banner-kkp.png'
import { useState } from 'react';


const Beranda = () => {
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
            <Helmet>
                <title>Dewi Bahari</title>
                {/* <link rel="icon" type="image/png" href={DewiFooterLogo} sizes /> */}
            </Helmet>
            <NavBar2 />
            <div className="page-content-container">
                <Banner pageData={pageData} />
                <div className="content-container">
                    <LocationBeranda />
                    <MapBeranda />
                    <ArtikelBeranda />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Beranda