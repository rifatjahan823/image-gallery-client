import React from 'react';
import { useState, useEffect } from 'react'
import { BsFilterRight } from "react-icons/bs";
import '../styles/NavBar.css'

const NavBar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }
    useEffect(() => {

        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth)

    }, [])
    return (
        <div className='navbar'>
            <nav>
            <h1>Image Gallery</h1>
               <div>
               {(toggleMenu || screenWidth > 500) && (
                    <ul className="list">
                        <li className="items">Home</li>
                        <li className="items">Services</li>
                        <li className="items">Contact</li>
                    </ul>
                )}

                <BsFilterRight  onClick={toggleNav}  className="btn" />
                
                </div>
            </nav>
        </div>
    );
};

export default NavBar;