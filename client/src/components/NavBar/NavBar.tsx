'use client';
import React, {useState} from 'react';
import './NavBar.scss';

interface NavBarProps {
    title:string;
}

const NavBar = ({title}:NavBarProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<number | null>(null);

    const nav = [
        {
            menu: "Shop",
            link: "/",
            subMenu: [
            {
                name: "Books",
                items: [
                { name: "Search By Subject", link: "/about", des:"Browse our catalog of books by subject" },
                { name: "Browse Textbooks", link: "/contact", des:"Browse our catalog of textbooks and eBooks" }
                ]
            },
            {
                name: "Courseware",
                items: [
                { name: "WileyPLUS", des:"Browse our catalog of books by subject" , link: "/courseware" },
                { name: "Knewton Alta",des:"Browse our catalog of books by subject" , link: "/instructor" },
                { name: "ZyBooks",des:"Browse our catalog of books by subject" , link: "/instructor" }
                ]
            },
            {
                name: "Admission Tests",
                items: [
                { name: "ACT",des:"Browse our catalog of books by subject" , link: "/courseware" },
                { name: "GMAT", des:"Browse our catalog of books by subject" ,link: "/instructor" },
                ]
            },
            {
                name: "BRANDS AND IMPRINTS",
                items: [
                { name: "Dummies",des:"Browse our catalog of books by subject" , link: "/courseware" },
                { name: "Jk Lasser",des:"Browse our catalog of books by subject" , link: "/instructor" },
                { name: "Jossey-Bass",des:"Browse our catalog of books by subject" , link: "/instructor" },
                { name: "The Leadership Challenge",des:"Browse our catalog of books by subject" , link: "/instructor" },
                ]
            },
            ]
        },
        {
            menu: "Research Library",
            link: "/",
            subMenu: [
            {
                name: "Library Resources",
                items: [
                { name: "Search By Subject3", des:"Browse our catalog of books by subject" ,link: "/about" },
                { name: "Browse Textbooks4", des:"Browse our catalog of books by subject" ,link: "/contact" }
                ]
            },
            {
                name: "Journals",
                items: [
                { name: "Open Access Journals", des:"Browse our catalog of books by subject" ,link: "/journals" },
                { name: "Research Articles", des:"Browse our catalog of books by subject" ,link: "/articles" }
                ]
            }
            ]
        },
        {
            menu: "Publishing Services",
            link: "/",
            subMenu: [
            {
                name: "Services",
                items: [
                { name: "Editorial Support", des:"Browse our catalog of books by subject" ,link: "/editorial" },
                { name: "Production Services", des:"Browse our catalog of books by subject" ,link: "/production" }
                ]
            }
            ]
        },
        {
            menu: "Education Solutions",
            link: "/",
            subMenu: [
            {
                name: "Books",
                items: [
                { name: "Search By Subject", link: "/about", des:"Browse our catalog of books by subject" },
                { name: "Browse Textbooks", link: "/contact", des:"Browse our catalog of textbooks and eBooks" }
                ]
            },
            {
                name: "Courseware",
                items: [
                { name: "WileyPLUS", des:"Browse our catalog of books by subject" , link: "/courseware" },
                { name: "Knewton Alta",des:"Browse our catalog of books by subject" , link: "/instructor" },
                { name: "ZyBooks",des:"Browse our catalog of books by subject" , link: "/instructor" }
                ]
            },
            {
                name: "Admission Tests",
                items: [
                { name: "ACT",des:"Browse our catalog of books by subject" , link: "/courseware" },
                { name: "GMAT", des:"Browse our catalog of books by subject" ,link: "/instructor" },
                ]
            },
            {
                name: "BRANDS AND IMPRINTS",
                items: [
                { name: "Dummies",des:"Browse our catalog of books by subject" , link: "/courseware" },
                { name: "Jk Lasser",des:"Browse our catalog of books by subject" , link: "/instructor" },
                { name: "Jossey-Bass",des:"Browse our catalog of books by subject" , link: "/instructor" },
                { name: "The Leadership Challenge",des:"Browse our catalog of books by subject" , link: "/instructor" },
                ]
            },
            ]
        },
        {
            menu: "Prefessional Development",
            link: "/",
            subMenu: [
            {
                name: "Books",
                items: [
                { name: "Search By Subject", link: "/about", des:"Browse our catalog of books by subject" },
                { name: "Browse Textbooks", link: "/contact", des:"Browse our catalog of textbooks and eBooks" }
                ]
            },
            {
                name: "Courseware",
                items: [
                { name: "WileyPLUS", des:"Browse our catalog of books by subject" , link: "/courseware" },
                { name: "Knewton Alta",des:"Browse our catalog of books by subject" , link: "/instructor" },
                { name: "ZyBooks",des:"Browse our catalog of books by subject" , link: "/instructor" }
                ]
            },
            {
                name: "Admission Tests",
                items: [
                { name: "ACT",des:"Browse our catalog of books by subject" , link: "/courseware" },
                { name: "GMAT", des:"Browse our catalog of books by subject" ,link: "/instructor" },
                ]
            },
            {
                name: "BRANDS AND IMPRINTS",
                items: [
                { name: "Dummies",des:"Browse our catalog of books by subject" , link: "/courseware" },
                { name: "Jk Lasser",des:"Browse our catalog of books by subject" , link: "/instructor" },
                { name: "Jossey-Bass",des:"Browse our catalog of books by subject" , link: "/instructor" },
                { name: "The Leadership Challenge",des:"Browse our catalog of books by subject" , link: "/instructor" },
                ]
            },
            ]
        },
    ];

    return (
        <div className="container-fluid navBar shadow">
            {/* ---------- DESKTOP NAV ---------- */}
            <div className="row align-items-center d-none d-md-flex">
                <div className="col-md-9">
                <div className="d-flex justify-content-evenly p-2">
                    {nav.map((item, index) => (
                    <div key={index} className="menuItem">
                        <div
                        className={`${openIndex === index ? 'active' : 'nonActive'} mainMenu`}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                        {item.menu}
                        </div>
                        <div className={`${openIndex === index ? 'showSubMenu' : 'hideSubMenu'} p-3`}>
                        <div className="row">
                            {item.subMenu &&
                            item.subMenu.map((subItem, subIndex) => (
                                <div key={subIndex} className="col-md-3">
                                <div className="submenu-title fw-bold">{subItem.name}</div>
                                <div className="underline"></div>
                                <div className="pt-2">
                                    {subItem.items.map((subSubItem, subSubIndex) => (
                                    <div key={subSubIndex} className="pb-3">
                                        <div className="row align-items-center">
                                        <div className="col-auto">
                                            <div className="icon"></div>
                                        </div>
                                        <div className="col ps-0">
                                            <a href={subSubItem.link} className="text-decoration-none text-dark">
                                            {subSubItem.name}
                                            </a>
                                            <div className="subDescription">{subSubItem.des}</div>
                                        </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
                <div className="col-md-3 text-end">
                <div className="btn p-2">Institutions & Businesses</div>
                </div>
            </div>

            {/* ---------- MOBILE NAV ---------- */}
            <div className="d-block d-md-none">
                {/* Top Bar */}
                <div className="d-flex justify-content-between align-items-center p-2">
                <div className="fw-bold">{title}</div>
                <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
                    ☰
                </div>
                </div>

                {mobileOpen && (
                <div className="mobileMenu">
                    {/* Show Main Menu List */}
                    {selectedMenu === null && (
                    <div className="mainMenuList">
                        {nav.map((item, index) => (
                        <div
                            key={index}
                            className="mobileMainMenu"
                            onClick={() => setSelectedMenu(index)}
                        >
                            {item.menu}
                        </div>
                        ))}
                    </div>
                    )}

                    {/* Show Selected Submenu */}
                    {selectedMenu !== null && (
                    <div className="subMenuList">
                        {/* Back Arrow */}
                        <div className="backArrow" onClick={() => setSelectedMenu(null)}>
                        ← Back
                        </div>
                        {nav[selectedMenu].subMenu.map((subItem, subIndex) => (
                        <div key={subIndex}>
                            <div className="fw-bold">{subItem.name}</div>
                            {subItem.items.map((subSubItem, subSubIndex) => (
                            <div key={subSubIndex} className="ps-3 py-2">
                                <a href={subSubItem.link} className="text-decoration-none text-dark">
                                {subSubItem.name}
                                </a>
                                <div className="subDescription">{subSubItem.des}</div>
                            </div>
                            ))}
                        </div>
                        ))}
                    </div>
                    )}
                </div>
                )}
            </div>
        </div>
    );
}

export default NavBar;