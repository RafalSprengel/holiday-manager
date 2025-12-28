"use client";

import { useState, useEffect } from 'react';
import './ClendarPicker.css';

const Day = ({
    currentDay,
    currentDate,
    isPast,
    isToday,
    isSelectedAsStart,
    isSelectedAsEnd,
    isSelectedBetween,
    isHovered,
    isReserved,
    isSunday,
    isSaturday,
    handleClickOnDay,
    handleMouseHoverDay,
}) => {
    const dayClasses = [
        'day',
        isPast ? 'day__past' : '',
        isToday ? 'day__today' : '',
        isReserved ? 'day__reserved' : '',
        isSaturday ? 'day__saturday' : '',
        isSunday ? 'day__sunday' : '',
        isSelectedAsStart ? 'day__selected-as-start' : '',
        isSelectedAsEnd ? 'day__selected-as-end' : '',
        isSelectedBetween ? 'day__selected-between' : '',
        isHovered ? 'day__hovered' : ''
    ].filter(Boolean).join(' ');

    return (
        <div
            className={dayClasses}
            onClick={() => handleClickOnDay(currentDate)}
            onMouseEnter={() => handleMouseHoverDay(currentDate)}
        >
            {currentDay}
        </div>
    );
};

const Month = ({ currentDate, dbDates, selectedStart, selectedEnd, setSelectedStart, setSelectedEnd }) => {
    const [hoveredDate, setHoveredDate] = useState(null);
    const res = [];
    let currentDay = 0;
    
    let firstDayOfTheMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    if (firstDayOfTheMonth === 0) firstDayOfTheMonth = 7;
    
    const numberOfDaysCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= 42; i++) {
        if (i >= firstDayOfTheMonth && i < numberOfDaysCurrentMonth + firstDayOfTheMonth) {
            currentDay++;
            let isSelectedBetween = false;
            let isReserved = false;
            let dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay);
            let currentDateFormatted = formatDate(dateObj);
            
            const todayFormatted = formatDate(new Date());
            const isPast = new Date(currentDateFormatted + 'T23:59:59') < new Date();
            const isToday = todayFormatted === currentDateFormatted;
            const isSunday = dateObj.getDay() === 0;
            const isSaturday = dateObj.getDay() === 6;
            
            let isSelectedAsStart = selectedStart === currentDateFormatted;
            let isSelectedAsEnd = selectedEnd === currentDateFormatted;
            
            if (dbDates) {
                isReserved = dbDates.some(el => el.date === currentDateFormatted);
            }

            let isHovered = selectedStart && !selectedEnd && 
                            new Date(currentDateFormatted) > new Date(selectedStart) && 
                            new Date(currentDateFormatted) < new Date(hoveredDate);

            if (selectedStart && selectedEnd) {
                isSelectedBetween = new Date(currentDateFormatted) > new Date(selectedStart) && 
                                    new Date(currentDateFormatted) < new Date(selectedEnd);
            }

            const handleClickOnDay = (date) => {
                if (isPast) return;
                if (!selectedStart || (selectedStart && selectedEnd)) {
                    setSelectedStart(date);
                    setSelectedEnd(null);
                } else if (selectedStart && !selectedEnd) {
                    if (new Date(currentDateFormatted) < new Date(selectedStart)) {
                        setSelectedEnd(selectedStart);
                        setSelectedStart(date);
                    } else {
                        setSelectedEnd(date);
                    }
                }
            };

            const handleMouseHoverDay = (date) => {
                if (selectedStart && !selectedEnd) setHoveredDate(date);
            };

            res.push(
                <Day
                    key={currentDateFormatted}
                    currentDay={currentDay}
                    currentDate={currentDateFormatted}
                    isPast={isPast}
                    isToday={isToday}
                    isSelectedAsStart={isSelectedAsStart}
                    isSelectedAsEnd={isSelectedAsEnd}
                    isSelectedBetween={isSelectedBetween}
                    isReserved={isReserved}
                    isSunday={isSunday}
                    isSaturday={isSaturday}
                    handleClickOnDay={handleClickOnDay}
                    handleMouseHoverDay={handleMouseHoverDay}
                    isHovered={isHovered}
                />
            );
        } else {
            res.push(<div className="day__blank" key={`blank-${i}`}></div>);
        }
    }
    return <div className="month-container">{res}</div>;
};

function formatDate(dateObj) {
    if (dateObj) {
        let year = dateObj.getFullYear();
        let month = ((dateObj.getMonth() + 1)).toString().padStart(2, '0');
        let day = dateObj.getDate().toString().padStart(2, '0');
        return (year + "-" + month + '-' + day);
    } else return null
}

export default function CalendarPicker({ dbDates, onDateChange }) {
    const [currentDate, setDate] = useState(new Date());
    const [selectedStart, setSelectedStart] = useState(null);
    const [selectedEnd, setSelectedEnd] = useState(null);

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monthsNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        if (onDateChange) {
            onDateChange({ start: selectedStart, end: selectedEnd });
        }
    }, [selectedStart, selectedEnd, onDateChange]);

    const changeMonth = (offset) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + offset);
        setDate(newDate);
    };

    const changeYear = (offset) => {
        const newDate = new Date(currentDate);
        newDate.setFullYear(newDate.getFullYear() + offset);
        setDate(newDate);
    };

    return (
        <div className="calendar">
            <div className="navigation">
                <div className="navigation__arrow material-symbols-outlined" onClick={() => changeYear(-1)}>keyboard_double_arrow_left</div>
                <div className="navigation__arrow material-symbols-outlined" onClick={() => changeMonth(-1)}>keyboard_arrow_left</div>
                <div className="navigation__current-month" onClick={() => setDate(new Date())}>
                    {monthsNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </div>
                <div className="navigation__arrow material-symbols-outlined" onClick={() => changeMonth(1)}>keyboard_arrow_right</div>
                <div className="navigation__arrow material-symbols-outlined" onClick={() => changeYear(1)}>keyboard_double_arrow_right</div>
            </div>

            <div className="week-days">
                {weekDays.map((day) => <span className="week-days__names" key={day}>{day}</span>)}
            </div>

            <Month
                currentDate={currentDate}
                dbDates={dbDates}
                selectedStart={selectedStart}
                selectedEnd={selectedEnd}
                setSelectedStart={setSelectedStart}
                setSelectedEnd={setSelectedEnd}
            />

            <div className="buttons">
                <button className="buttons__clear" onClick={() => { setSelectedStart(null); setSelectedEnd(null); }}>Clear</button>
                <button className="buttons__add">Book now</button>
            </div>
        </div>
    );
}