"use client"
import styles from './Sidebar.module.css';
import { JSX, useState, useRef, useEffect, MouseEvent } from 'react';
import Link from 'next/link';
import { IoHomeOutline, IoPersonOutline, IoHelpCircleOutline, IoBusinessOutline } from 'react-icons/io5';
import { BsCalendarDate } from 'react-icons/bs';
import { FiRefreshCcw, FiThumbsUp } from 'react-icons/fi';
import { HiOutlineUsers, HiOutlineArrowLeftOnRectangle } from 'react-icons/hi2';
import { TbChartBar } from 'react-icons/tb';
import { usePathname } from 'next/navigation';
import HamburgerButton from '@/components/HamburgerButton/HamburgerButton';

export default function Sidebar(): JSX.Element {

    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname()

    const handleClickOutside = (event: MouseEvent | Event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) setIsOpen(false)
    }

    const closeSideMenu = () => {
        const timer = setTimeout(() => {
            setIsOpen(false)
        }, 500)
        return () => clearTimeout(timer)
    }

    const toggleSideMenu = () => {
        setIsOpen(!isOpen)
    }




    const topMenuItems = [
        { name: 'Dashboard', icon: IoHomeOutline, current: true, path: '/' },
        { name: 'Calendar', icon: BsCalendarDate, current: false, path: '/calendar' },
        { name: 'My leaves', icon: FiRefreshCcw, current: false, path: '/my-leaves' },
        { name: 'Leaves to approve', icon: FiThumbsUp, current: false, path: '/approve-leaves' },
        { name: 'Employees', icon: HiOutlineUsers, current: false, path: '/employees' },
        { name: 'Reports', icon: TbChartBar, current: false, path: '/reports' },
        { name: 'Support', icon: IoHelpCircleOutline, current: false, path: '/support' },
        { name: 'Company', icon: IoBusinessOutline, current: false, path: '/company' },
    ];

    const bottomMenuItems = [
        { name: 'My account', icon: IoPersonOutline, path: '/my-account' },
        { name: 'Logout', icon: HiOutlineArrowLeftOnRectangle, path: '/logout' },
    ];

    useEffect(() => {
        const overlayElement = document.getElementById('content-overlay');

        if (isOpen) {
            overlayElement?.classList.add(styles.activeOverlay)
            window.addEventListener('mousedown', handleClickOutside)
        } else {
            overlayElement?.classList.remove(styles.activeOverlay)
        }

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
            if (overlayElement) {
                overlayElement.classList.remove(styles.activeOverlay);
            }
        }

    }, [isOpen])

    return (
        <div className={`${styles.container} ${isOpen ? styles.showContainer : ''}`} ref={sidebarRef}>
            {/* <div className={styles.closeButton} onClick={() => setIsOpen(!isOpen)}><span>X</span></div> */}
            <div className={styles.closeButton}>
                <HamburgerButton
                    isOpen={isOpen}
                    onClick={toggleSideMenu}
                    ariaLabel={isOpen ? 'Close menu' : 'Open menu'}
                />
            </div>
            <nav className={styles.nav}>
                <ul className={styles.menuList}>
                    {topMenuItems.map((item, index) => {
                        const delay = `${index * 0.07}s`;
                        const baseClass = (item.path == pathname) ? styles.menuItemActive : styles.menuItem;
                        const animatedClass = isOpen ? styles.menuItemAnimated : '';

                        return (
                            <li
                                key={item.name}
                                className={`${baseClass} ${animatedClass}`}
                                style={isOpen ? { '--animation-delay': delay } as React.CSSProperties : undefined}
                                onClick={closeSideMenu}
                            >
                                <Link href={item.path} className={styles.menuLink}>
                                    <item.icon className={styles.menuIcon} />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className={styles.bottomSection}>
                {bottomMenuItems.map((item, index) => {
                    const delay = `${(topMenuItems.length + index) * 0.05}s`;
                    const animatedClass = isOpen ? styles.menuItemAnimated : '';

                    return (
                        <div
                            key={item.name}
                            className={`${styles.menuItem} ${animatedClass}`}
                            style={isOpen ? { '--animation-delay': delay } as React.CSSProperties : undefined}>
                            <Link href={item.path} className={styles.menuLink}>
                                <item.icon className={styles.menuIcon} />
                                <span>{item.name}</span>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}