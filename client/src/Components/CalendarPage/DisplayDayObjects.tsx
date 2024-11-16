import { useContext, useEffect } from "react";
import DayObject from "../DayObject/DayObject";
import { MonthChangeContext } from "../MonthChangeButton/MonthChangeContext";
import { set } from "react-datepicker/dist/date_utils";

const DayObjects = () => {
    const {currentYear, currentMonth, setCurrentMonth, setCurrentYear} = useContext(MonthChangeContext);
    //Testing
    
    useEffect
    (() => {
        setCurrentMonth(new Date().getMonth());
        setCurrentYear(new Date().getFullYear());
    }, []);

    if (currentYear === null || currentMonth === null) {
        return null;
    }

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    return (
        <>
            {Array.from({ length: daysInMonth }, (_, i) => (
                <div key={i}>
                    <DayObject currentDate={new Date(currentYear, currentMonth, i + 1)} />
                </div>
            ))}
        </>
    );
}

export default DayObjects;