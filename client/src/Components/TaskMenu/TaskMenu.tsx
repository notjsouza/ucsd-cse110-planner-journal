import React, { useContext, useState } from "react";
import "./TaskMenu.css";
import { TaskMenuContext } from "./TaskMenuContext";
import { Task } from "../../Types/TaskType";

const TaskMenu: React.FC = () => {

  const taskMenuContext = useContext(TaskMenuContext);

  const [taskName, setTaskName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [isReminder, setIsReminder] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = { 
        id: Math.floor(Math.random() * 1000),
        name: taskName,
        start: convertTo12HourFormat(startTime),
        end: convertTo12HourFormat(endTime)
    };

    if (taskMenuContext.currentDate) {
      taskMenuContext.addTask(taskMenuContext.currentDate, newTask);
    } else {
      console.error("Current date is null");
    }

    setTaskName("");
    setStartTime("");
    setEndTime("");
    setReminderTime("");
    setIsReminder(false);

    taskMenuContext.setCurrentDate(null);
    taskMenuContext.setIsOpen(false);
  };

  return (
    <div className="task-menu-container">
      <h1 className="task-menu-title">Create Task/Event</h1>
      <form className="task-menu-form" onSubmit={handleSubmit}>
        <label className="task-menu-label">Task Name</label>
        <input
          className="task-menu-input"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <label className="task-menu-label">Task Start Time</label>
        <input
          className="task-menu-input"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label className="task-menu-label">Task End Time</label>
        <input
          className="task-menu-input"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <div className="reminder-section">
          <label className="task-menu-label">Reminder Time</label>
          <select
            className="task-menu-select"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}>
            <option value="">Select time</option>
            <option value="5">5 minutes before</option>
            <option value="10">10 minutes before</option>
            <option value="30">30 minutes before</option>
          </select>
          <div className="checkbox-icon">
            <input
              type="checkbox"
              checked={isReminder}
              onChange={() => setIsReminder(!isReminder)}
            />
          </div>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskMenu;

//Convert 24-hour time to 12-hour time
const convertTo12HourFormat = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    let period = "AM";
    let convertedHours = hours;

    if (hours === 0) {
        convertedHours = 12; // 00:xx should be 12:xx AM
    } else if (hours === 12) {
        period = "PM"; // 12:xx should be 12:xx PM
    } else if (hours > 12) {
        convertedHours = hours - 12; // Convert to PM
        period = "PM";
    }

    // Format hours and minutes to ensure two digits for minutes and hours
    return `${convertedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};