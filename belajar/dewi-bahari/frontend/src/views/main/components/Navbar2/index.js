import './style.css'
import Logo from "../../Assets/Images/logo.png"
import IconSearch from "../../Assets/Images/Icon-Search.png"
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ArrowUpIcon from '../Icons/ArrowUpSolid'
import ArrowDownIcon from '../Icons/ArrowDownSolid'

const NavBar2 = () => {
    const [menus, setMenus] = useState([
        {
            nama: "Beranda",
            status: true,
            url: "/"
        },
        {
            nama: "Tentang",
            status: false,
            url: "/tentang"
        },
        {
            nama: "Profil",
            status: false,
            url: "/profil"
        },
        {
            nama: "Galeri",
            status: false,
            url: "/galeri",
            subMenu: [
                {
                    nama: "Foto",
                    status: false,
                    url: "/galeri/foto"
                },
                {
                    nama: "Video",
                    status: false,
                    url: "/galeri/video"
                },
            ]
        },
        {
            nama: "Artikel",
            status: false,
            url: "/artikel"
        },
        {
            nama: "Mitra",
            status: false,
            url: "/mitra"
        },
    ])
    const location = useLocation()

    // console.log(menus);
    useEffect(() => {
        if (location.pathname) {
            setMenus((prevMenus) => {
                return menus.map((menu) => {
                    if (menu.url === location.pathname || menu.url === location.pathname.substring(0, location.pathname.indexOf('/', 1))) {
                        return { ...menu, status: true }
                    }
                    else if (menu.subMenu && location.pathname.split(menu.url).length === 2 && menu.url !== '/') {
                        // console.log(menu.subMenu);
                        return {
                            ...menu, subMenu: menu.subMenu.map((subMenu) => {
                                if (subMenu.url === location.pathname) {
                                    return { ...subMenu, status: true }
                                } else {
                                    return { ...subMenu, status: false }
                                }
                            }), status: true
                        }
                    }
                    else {
                        return { ...menu, status: false }
                    }
                })
            })
        }
    }, [location])

    const navigate = useNavigate()

    const handleItemClick = (e) => {
        navigate(e.target.getAttribute('url'))
    }

    const [dropDownHidden, setDropDownHidden] = useState(true)

    const [toggleStatus, setToggleStatus] = useState(false)

    return (
        <div className="navbar-container">
            <div className="navbar-site-logo-container">
                <img src={Logo} alt="" className="navbar-logo" />
                <p className="navbar-text">Kementerian Kelautan Dan Perikanan Republik Indonesia</p>
            </div>
            <div className="navbar-action-container">
                <div className={`navbar-action-menu-container ${toggleStatus && "open"}`}>
                    {
                        menus.map((menu) => {
                            return (

                                menu.subMenu
                                    ?
                                    <div key={menu.url} className={`dropdown-container`}>
                                        <div className={`navbar-dropdown-container`} onClick={() => dropDownHidden ? setDropDownHidden(false) : setDropDownHidden(true)}>
                                            <div key={menu.url} name={menu.nama} className={`navbar-action-menu-item ${menu.status ? "navbar-active" : null}`}>
                                                {menu.nama}
                                            </div>
                                            {
                                                dropDownHidden
                                                    ? (<ArrowDownIcon className='navbar-dropdown-arrow' />)
                                                    : (<ArrowUpIcon className='navbar-dropdown-arrow' />)
                                            }

                                        </div>
                                        <div hidden={dropDownHidden}>
                                            <div className='navbar-dropdown-content'>
                                                {menu.subMenu.map((item, index) => {
                                                    return (
                                                        <div key={item.url} name={item.nama} className={`navbar-action-menu-item ${index + 1 === menu.subMenu.length ? 'dropdown-item-last' : 'dropdown-item'} ${item.status ? "navbar-active" : null}`} url={item.url} onClick={handleItemClick}>
                                                            {item.nama}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div key={menu.url} name={menu.nama} className={`navbar-action-menu-item ${menu.status ? "navbar-active" : null}`} url={menu.url} onClick={handleItemClick}>
                                        {menu.nama}
                                    </div>


                            )
                        })
                    }
                    <div className="navbar-action-search-container-open">
                        <img src={IconSearch} alt="" className="navbar-action-search-icon" />
                        <input className="navbar-action-search-input" placeholder="Search..." />
                    </div>

                </div>
                <div className="navbar-action-search-container">
                    <img src={IconSearch} alt="" className="navbar-action-search-icon" />
                    <input className="navbar-action-search-input" placeholder="Search..." />
                </div>
            </div>
            <div className={`navbar-toggle ${toggleStatus && "open"}`} onClick={() => setToggleStatus(!toggleStatus)}>
                <div className='bar'></div>
            </div>
        </div>
    )
}

export default NavBar2