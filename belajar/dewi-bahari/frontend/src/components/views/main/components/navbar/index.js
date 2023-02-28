import { useState } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import './style.css'

const NavBar = ({ activeItem, handleItemClick }) => {
    const [menus, setMenus] = useState([])


    return (
        <Menu text className='test'>
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='messages'
                active={activeItem === 'messages'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='friends'
                active={activeItem === 'friends'}
                onClick={handleItemClick}
            />
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default NavBar