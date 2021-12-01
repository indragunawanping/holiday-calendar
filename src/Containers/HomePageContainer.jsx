import React, { useState, useEffect } from 'react';
import HomePage from "../Components/HomePage";
import 'react-calendar/dist/Calendar.css';
import { getCurrentCountry, getHolidayEvent } from "../req.js"
import moment from "moment";

import Calendar from "color-calendar";
import "color-calendar/dist/css/theme-glass.css";
import styles from "../Components/HomePage.module.css";
import { Loader } from "semantic-ui-react";

function HomePageContainer() {
    const [currentCountryCode, setCurrentCountryCode] = useState('ID');
    const [currentCountry, setCurrentCountry] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(moment(new Date()).format('YYYY'));
    const [isLoading, setIsLoading] = useState(false);
    const [holidayList, setHolidayList] = useState([]);
    const [currentHoliday, setCurrentHoliday] = useState('');
    // const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        console.log('holidayList: ', holidayList);
        new Calendar({
            id: "#myCal",
            theme: "glass",
            weekdayType: "long-upper",
            monthDisplayType: "long",
            calendarSize: "small",
            layoutModifiers: ["month-left-align"],
            eventsData:
                holidayList
                // {
                //     end: "2021-12-25",
                //     id: 1,
                //     name: "Hari Raya Natal",
                //     start: "2021-12-25"
                // }
            ,
            dateChanged: (currentDate) => {
                updateSelectedDate(currentDate);
                if (moment(currentDate).format('YYYY') !== selectedYear) {
                    console.log('update tahun')
                    updateSelectedYear(moment(currentDate).format('YYYY'))
                }
            },
            monthChanged: (currentDate) => {
                updateSelectedYear(moment(currentDate).format('YYYY'))
            }
        });
    }, [holidayList])

    useEffect(() => {
        fetchCurrentCountryCode();
    }, [])

    useEffect(() => {
        fetchHolidayEvent();
    }, [selectedYear]);

    useEffect(() => {
        getCurrentHoliday();
    }, [holidayList, selectedDate])

    const updateSelectedDate = (date) => {
        setSelectedDate(date);
    }
    const updateSelectedYear = (year) => {
        console.log('update here');
        setSelectedYear(year);
    }

    const fetchCurrentCountryCode = async () => {
        setIsLoading(true);
        try {
            let response = await getCurrentCountry();
            const countryCodeData = response.data;

            if (countryCodeData) {
                console.log('countryCodeData: ', countryCodeData);
                setCurrentCountry(countryCodeData.country.name);
                setCurrentCountryCode(countryCodeData.country.iso_code);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            // setErrorMessage(error.message);
        }
    }

    const fetchHolidayEvent = async () => {
        setIsLoading(true);
        try {
            let response = await getHolidayEvent(selectedYear, currentCountryCode);
            const holidayEventData = response.data;

            if (holidayEventData) {
                let tempHolidayList = [];

                for (const event of holidayEventData) {
                    tempHolidayList.push(
                        {
                            id: 1,
                            name: event.localName,
                            start: event.date,
                            end: event.date
                        }
                    )
                }

                setHolidayList(tempHolidayList);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            // setErrorMessage(error.message);
        }
    }

    const getCurrentHoliday = () => {
        for (const holiday of holidayList) {
            if (holiday.start === moment(selectedDate).format('YYYY-MM-DD')) {
                setCurrentHoliday(holiday.name);
                break;
            } else {
                setCurrentHoliday('No Event');
            }
        }
    }

    // const onCalendarChange = (e) => {
    //     setSelectedDate(e);
    //     if (moment(e).format('YYYY') !== selectedYear) {
    //         setSelectedYear(moment(e).format('YYYY'));
    //     }
    // }

    return (
        // isLoading ?
        //     <div className={styles.LoaderContainer}>
        //         <Loader active inline='centered'>Loading...</Loader>
        //     </div>
        //     :
        <div>
            <div className={styles.CalendarContainer}>
                <div className={styles.Title}>
                    Event Calendar
                </div>
                <div className={styles.SubTitle}>{currentCountry}</div>
                <div id="myCal"/>
                <div className={styles.SelectedDate}>
                    {moment(selectedDate).format('Do MMMM YYYY')}
                </div>
                <div className={styles.EventName}>{currentHoliday}</div>
            </div>
        </div>

        // <HomePage currentCountryCode={currentCountryCode}
        //           currentCountry={currentCountry}
        //           selectedDate={selectedDate}
        //           isLoading={isLoading}
        //           currentHoliday={currentHoliday}
        //           onCalendarChange={onCalendarChange}
        // />
    );
}

export default HomePageContainer;
