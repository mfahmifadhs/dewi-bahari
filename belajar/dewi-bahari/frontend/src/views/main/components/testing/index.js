import Footer from "../Footer"
import NavBar2 from "../Navbar2"
import bannerKKP from '../../Assets/Images/banner-kkp.png'
import { useState } from 'react';
import Banner from "../Banner";
import LocationBeranda from "../LocationBeranda";
import MapBeranda from "../MapBeranda";
import ArtikelBeranda from "../ArtikelBeranda";

const Test = () => {
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
                    <LocationBeranda />
                    <MapBeranda />
                    <ArtikelBeranda />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Test