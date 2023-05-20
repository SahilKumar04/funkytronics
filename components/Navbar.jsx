
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

export default function Navbar() {
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

    return (
        <div className="card">
            <Menubar model={items} start={start} />
        </div>
    )
}
        