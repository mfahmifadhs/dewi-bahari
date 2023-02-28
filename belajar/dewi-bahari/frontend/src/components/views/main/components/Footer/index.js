import React from 'react';
import './style.css';
import IGLogo from '../../Assets/Images/instagram.png'
import FBLogo from '../../Assets/Images/facebook.png'
import DewiFooterLogo from '../../Assets/Images/logo-dewi-footer.png'

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-content-left-container'>
                <img src={DewiFooterLogo} className='footer-content-left-logo' />
                <div className='footer-content-left-contact-container'>
                    <img src={IGLogo} className='footer-content-left-contact-icon' />
                    <img src={FBLogo} className='footer-content-left-contact-icon' />
                    <div className='footer-content-left-contact-email'>
                        dewibaharikkp@gmail.com
                    </div>
                </div>
            </div>
            <div className='footer-content-left-contact-address-container'>
                <div className='footer-content-left-contact-address'>
                    DIREKTORAT JASA KELAUTAN
                </div>
                <div className='footer-content-left-contact-address'>
                    Direktorat Jenderal Pengelolaan Ruang Laut Kementerian Kelautan dan Perikanan Gedung Mina Bahari III Lt 9 Jl. Medan Merdeka Timur 16 Jakarta Pusat 10110 Telp. +62 21 3513258 Fax. +62 21 3513258
                </div>
                <div className='footer-content-left-contact-address'>
                    Gedung Mina Bahari III Lt 9
                </div>
                <div className='footer-content-left-contact-address'>
                    Jl. Medan Merdeka Timur 16 Jakarta Pusat 10110
                </div>
                <div className='footer-content-left-contact-address'>
                    Telp. +62 21 3513258
                </div>
                <div className='footer-content-left-contact-address'>
                    Fax. +62 21 3513258
                </div>
            </div>

        </div>
    )
}

export default Footer