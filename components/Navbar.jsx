
import React, { useEffect, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { useSelector } from 'react-redux';
import { Avatar } from 'primereact/avatar';
import { SelectButton } from 'primereact/selectbutton';

export default function Navbar() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [theme, setTheme] = useState('saga-orange');
    const options = ['saga-orange', 'arya-orange'];
    const [value, setValue] = useState(options[0]);

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

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-file',
            url: '/'
            // items: [
            //     {
            //         label: 'New',
            //         icon: 'pi pi-fw pi-plus',
            //         items: [
            //             {
            //                 label: 'Bookmark',
            //                 icon: 'pi pi-fw pi-bookmark'
            //             },
            //             {
            //                 label: 'Video',
            //                 icon: 'pi pi-fw pi-video'
            //             },

            //         ]
            //     },
            //     {
            //         label: 'Delete',
            //         icon: 'pi pi-fw pi-trash'
            //     },
            //     {
            //         separator: true
            //     },
            //     {
            //         label: 'Export',
            //         icon: 'pi pi-fw pi-external-link'
            //     }
            // ]
        },
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            url: '/profile'
            // items: [
            //     {
            //         label: 'New',
            //         icon: 'pi pi-fw pi-user-plus',

            //     },
            //     {
            //         label: 'Delete',
            //         icon: 'pi pi-fw pi-user-minus',

            //     },
            //     {
            //         label: 'Search',
            //         icon: 'pi pi-fw pi-users',
            //         items: [
            //             {
            //                 label: 'Filter',
            //                 icon: 'pi pi-fw pi-filter',
            //                 items: [
            //                     {
            //                         label: 'Print',
            //                         icon: 'pi pi-fw pi-print'
            //                     }
            //                 ]
            //             },
            //             {
            //                 icon: 'pi pi-fw pi-bars',
            //                 label: 'List'
            //             }
            //         ]
            //     }
            // ]
        },
        {
            label: 'Products',
            icon: 'pi pi-fw pi-calendar',
            url: '/products'
            // items: [
            //     {
            //         label: 'Edit',
            //         icon: 'pi pi-fw pi-pencil',
            //         items: [
            //             {
            //                 label: 'Save',
            //                 icon: 'pi pi-fw pi-calendar-plus'
            //             },
            //             {
            //                 label: 'Delete',
            //                 icon: 'pi pi-fw pi-calendar-minus'
            //             }
            //         ]
            //     },
            //     {
            //         label: 'Archive',
            //         icon: 'pi pi-fw pi-calendar-times',
            //         items: [
            //             {
            //                 label: 'Remove',
            //                 icon: 'pi pi-fw pi-calendar-minus'
            //             }
            //         ]
            //     }
            // ]
        },
        {
            label: 'Logout',
            icon: 'pi pi-fw pi-power-off'

        }
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    // const end = <InputText placeholder="Search" type="text" className="w-full" />;
    const end = <><i className="pi pi-shopping-cart p-overlay-badge" style={{ fontSize: '1.5rem', marginRight: "20px" }}>
        <Badge value={`${cartItems.length}`} ></Badge>
    </i>
        <Avatar className="p-overlay-badge" image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp" size="circle">
        </Avatar>
        <div className="card flex justify-content-center">
        <SelectButton value={value} onChange={(e) => {e.value && handleThemeChange(e.value)}} options={options} />
    </div>
    </>

    return (
        <div className="card sticky top-0">
            <Menubar model={items} start={start} end={end} className='items-center' />
        </div>
    )
}
