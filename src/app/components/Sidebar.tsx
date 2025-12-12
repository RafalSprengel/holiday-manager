import { JSX } from 'react';
import styles from './Sidebar.module.css';
// Importujemy potrzebne ikony z różnych zestawów
import { IoHomeOutline, IoPersonOutline, IoHelpCircleOutline, IoBusinessOutline } from 'react-icons/io5';
import { BsCalendarDate } from 'react-icons/bs';
import { FiRefreshCcw, FiThumbsUp } from 'react-icons/fi';
import { HiOutlineUsers, HiOutlineArrowLeftOnRectangle } from 'react-icons/hi2';
import { TbChartBar } from 'react-icons/tb';

export default function Sidebar(): JSX.Element {
    // Dane dla elementów menu na podstawie pierwszego zrzutu ekranu
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

    // Elementy dolnej sekcji (Konto i Wylogowanie)
    const bottomMenuItems = [
        { name: 'My account', icon: IoPersonOutline, path: '/my-account' },
        { name: 'Logout', icon: HiOutlineArrowLeftOnRectangle, path: '/logout' },
    ];

    return (
        <div className={styles.container}>
            {/* Przycisk otwierania/zamykania - Zostawiony bez zmian */}
            <div className={styles.closeButton}><span>X</span></div>
            
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
                    // Używamy tego samego stylu dla linków, ale bez żółtego tła
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