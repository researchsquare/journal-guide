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
        <div className='NavBar'>
            <div>
                {
                    nav.map((item, index) => (
                        <div key={index}>
                            <div>
                                {item.menu}
                            </div>
                            <div>
                                {item.subMenu && item.subMenu.map((subItem, subIndex) => (
                                    <div key={subIndex}>
                                        {subItem.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default NavBar;