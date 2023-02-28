import './style.css'
import imgMAP from '../../Assets/Images/map.png'
import Map from '../Map'

const MapBeranda = () => {
    return (
        <div className='location-beranda-container'>
            <div className='location-beranda-title-container'>
                <div className='location-beranda-title'>Peta sebaran Lokasi</div>
            </div>
            <div className='map-beranda-container'>
                <Map />
            </div>
        </div>
    )
}

export default MapBeranda