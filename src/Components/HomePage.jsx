import React from 'react';
// import Calendar from 'react-calendar';
import styles from './HomePage.module.css';
import moment from 'moment';
import { Loader } from 'semantic-ui-react';


moment.locale('id')



function HomePage(props) {
    console.log('props.selectedDate: ', props.selectedDate);

    return (
        props.isLoading ?
            <div className={styles.LoaderContainer}>
                <Loader active inline='centered'>Loading...</Loader>
            </div>
             :
            <div className={styles.CalendarContainer}>
                <div id="myCal"/>
                <div className={styles.Title}>
                    Event Calendar
                </div>
                <div className={styles.SubTitle}>{props.currentCountry}</div>
                {/*<Calendar*/}
                {/*    className={styles.Calendar}*/}
                {/*    onChange={props.onCalendarChange}*/}
                {/*    value={props.selectedDate}*/}
                {/*/>*/}
                <div className={styles.SelectedDate}>
                    {moment(props.selectedDate).format('Do MMMM YYYY')} Event:
                </div>
                <div>
                    {props.currentHoliday}
                </div>
            </div>

    );
}

export default HomePage;
