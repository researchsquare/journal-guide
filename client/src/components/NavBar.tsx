import React from 'react';

interface NavBarProps {
    title:string;
}

const NavBar = ({title}:NavBarProps) => {
    return (
        <nav className='p-4 mb-3 bg-light border'>
            <h1>{title}</h1>
        </nav>
    );
}

export default NavBar;