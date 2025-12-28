'use client'
import { useState } from "react";
import Card from "@/components/Card/Card";
import styles from "./page.module.css";
import CalendarPicker from "@/components/CalendarPicker/CalendarPicker";


export default function Dashboard() {
  const [booking, setBooking] = useState({ start: null, end: null });
  const reservedDates = [{ date: '2026-01-10' }, { date: '2026-01-13' }];

  return (
    <>
      <Card>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>My next leave</th>
              <th>days</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10.01.2026</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </Card>
      <Card>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Balance</th>
              <th>Used</th>
              <th>Available</th>
              <th>Allowance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Holidays</td>
              <td>1</td>
              <td>27</td>
              <td>28</td>
            </tr>
            <tr>
              <td>Sick Leave</td>
              <td>2</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Unpaid Leave</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </Card>
      <Card>
        <h3>Book time off</h3>
        <form>
          <button className={styles.button}>Send request</button>
        </form>
      </Card>
      <CalendarPicker
        dbDates={reservedDates}
        onDateChange={(dates) => setBooking(dates)} />

      {booking.start && <p>Wybrany początek: {booking.start}</p>}
      {booking.end && <p>Wybrany koniec: {booking.end}</p>}

    </>

  );
}