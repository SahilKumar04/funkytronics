
import React, { useEffect, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { useSelector } from 'react-redux';
import { Avatar } from 'primereact/avatar';
import { SelectButton } from 'primereact/selectbutton';
import { auth } from '../setup/firebase'
import { useRouter } from 'next/router';
import {useAuthState} from 'react-firebase-hooks/auth';

export default function Navbar() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [user, setuser] = useAuthState(auth)
    const [theme, setTheme] = useState('saga-orange');
    const [items, setItems] = useState([]);
    const options = ['saga-orange', 'arya-orange'];
    const [value, setValue] = useState(options[0]);
    const router = useRouter();
    const handleMenuItemClick = (event) => {
        if (event.item.label === "Home") {
            router.push("/")
        }
        else if (event.item.label === "Products") {
            router.push("/products")
        }
    };

    useEffect(() => {
        const linkElement = document.getElementById('prime-css');

        if (linkElement) {
            linkElement.setAttribute('href', `https://cdn.jsdelivr.net/npm/primereact@9.4.0/resources/themes/${theme}/theme.css`);
        } else {
            const newLinkElement = document.createElement('link');
            newLinkElement.setAttribute('rel', 'stylesheet');
            newLinkElement.setAttribute('type', 'text/css');
            newLinkElement.setAttribute('id', 'prime-css');
            newLinkElement.setAttribute('href', `https://cdn.jsdelivr.net/npm/primereact@9.4.0/resources/themes/${theme}/theme.css`);
            document.head.appendChild(newLinkElement);
        }
    }, [theme]);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        setValue(newTheme);
    };

    useEffect(() => {
        setItems([
            {
                label: 'Home',
                icon: 'pi pi-fw pi-file',
                command: handleMenuItemClick
            },
            {
                label: 'Products',
                icon: 'pi pi-fw pi-calendar',
                command: handleMenuItemClick
            }
        ])
    }, [])

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    // const end = <InputText placeholder="Search" type="text" className="w-full" />;
    const end = <div className='flex justify-center items-center gap-1'>
        <i className="pi pi-shopping-cart p-overlay-badge" onClick={() => router.push('/cart')} style={{ fontSize: '1.5rem', marginRight: "20px" }}>
            <Badge value={`${cartItems.length}`} ></Badge>
        </i>
        <Avatar className="p-overlay-badge" onClick={() => router.push('/profile')} image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp" size="circle">
        </Avatar>
        <i className='pi pi-fw pi-power-off' onClick={() => user ? auth.signOut(): router.push('/login')}></i>
        
        <div className="card flex justify-content-center">
            {value === 'saga-orange'? <i className='pi pi-sun' onClick={() => handleThemeChange(options[1])}/>:<i className='pi pi-moon' onClick={() => handleThemeChange(options[0])}/>}
        </div>
    </div>

    return (
        <div className="card sticky top-0">
            <Menubar model={items} start={start} end={end} className='items-center' />
        </div>
    )
}
