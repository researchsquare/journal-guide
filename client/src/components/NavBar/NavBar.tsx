import React from 'react';
import './NavBar.scss';

interface NavBarProps {
    title:string;
}

const NavBar = ({title}:NavBarProps) => {

    const nav = [
        {
            menu: 'Shop',
            link: '/',
            subMenu: [
                {name: 'Search By Subject', link: '/about'},
                {name: 'Browse Textbooks', link: '/contact'},
            ]
        },
        {
            menu: 'Research Library',
            link: '/',
            subMenu: [
                {name: 'Search By Subject', link: '/about'},
                {name: 'Browse Textbooks', link: '/contact'},
            ]
        },
        {
            menu: 'Publishing Services',
            link: '/',
            subMenu: [
                {name: 'Search By Subject', link: '/about'},
                {name: 'Browse Textbooks', link: '/contact'},
            ]
        },
        {
            menu: 'Education Resources',
            link: '/',
            subMenu: [
                {name: 'Search By Subject', link: '/about'},
                {name: 'Browse Textbooks', link: '/contact'},
            ]
        },
        {
            menu: 'Professional Development',
            link: '/',
            subMenu: [
                {name: 'Search By Subject', link: '/about'},
                {name: 'Browse Textbooks', link: '/contact'},
            ]
        },
    ]
    return (
        <div className="container-fluid navBar shadow ">
            <div className="row align-items-center">
                {/* Left side (menu) */}
                <div className="col-md-9">
                <div className="d-flex justify-content-evenly p-4">
                    {nav.map((item, index) => (
                    <div key={index}>
                        <div>{item.menu} &#129171;</div>
                        <div className="hide">
                        {item.subMenu &&
                            item.subMenu.map((subItem, subIndex) => (
                            <div key={subIndex}>{subItem.name}</div>
                            ))}
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                {/* Right side (institutions & businesses) */}
                <div className="col-md-3 text-end">
                <div className="btn p-2">
                    Institutions & Businesses
                </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;