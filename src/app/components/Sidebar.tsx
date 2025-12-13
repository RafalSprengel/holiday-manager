"use client"
import styles from './Sidebar.module.css';
import { JSX, useState, useRef, useEffect, MouseEvent } from 'react';
import { IoHomeOutline, IoPersonOutline, IoHelpCircleOutline, IoBusinessOutline } from 'react-icons/io5';
import { BsCalendarDate } from 'react-icons/bs';
import { FiRefreshCcw, FiThumbsUp } from 'react-icons/fi';
import { HiOutlineUsers, HiOutlineArrowLeftOnRectangle } from 'react-icons/hi2';
import { TbChartBar } from 'react-icons/tb';

export default function Sidebar(): JSX.Element {

    const [isOpen, setIsOpen] = useState(true);
    const sidebarRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent | Event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) setIsOpen(false)
    }

    const topMenuItems = [
        { name: 'Dashboard', icon: IoHomeOutline, current: true, path: '/dashboard' },
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
        if (isOpen) window.addEventListener('mousedown', handleClickOutside);
        console.log("wartosc isOpen to : ", isOpen)
        return () => window.removeEventListener('mousedown', handleClickOutside);

    }, [isOpen])

    return (
        <div className={`${styles.container} ${isOpen ? styles.showContainer : ''}`} ref={sidebarRef}>
            <div className={styles.closeButton} onClick={()=>setIsOpen(!isOpen)}><span>X</span></div>

            <nav className={styles.nav}>
                <ul className={styles.menuList}>
                    {topMenuItems.map((item) => (
                        <li key={item.name} className={item.current ? styles.menuItemActive : styles.menuItem}>
                            <a href={item.path} className={styles.menuLink}>
                                <item.icon className={styles.menuIcon} />
                                <span>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.bottomSection}>
                {bottomMenuItems.map((item) => (
                    <div key={item.name} className={styles.menuItem}>
                        <a href={item.path} className={styles.menuLink}>
                            <item.icon className={styles.menuIcon} />
                            <span>{item.name}</span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}