import React, { useState, useContext, useEffect } from 'react';
import DateTime from 'react-datetime';
import Moment from 'moment';
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { GlobalContext } from '../context/GlobalState';

import '../react-datetime.scss';

export default function ReminderForm() {
    const { addReminder, students, setStudents } = useContext(GlobalContext);

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [sendDate, setSendDate] = useState(Moment());
    const [studentId, setStudentId] = useState('Self');

    const [isLoading, showLoader] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        setError('');

        // gets the student list so that the user can select a student to send the message to
        const getStudentList = async () => {
          await axiosWithAuth()
                .get(`/restricted/users/${localStorage.getItem("id")}/students/`)
                .then(res => {
                    if (res.data.length > 0) {
                        setStudents(res.data);
                    } else {
                        setStudents([]);
                    }
                })
              .catch(err => {
                  setError('Error: Unable to retrieve students.');
              });
        };  
        getStudentList();
    }, []);

    // resets the state variables for the form
    const formReset = () => {
        showLoader(false);
        setTitle('')
        setMessage('');
        setStudentId('Self');
        setSendDate(Moment());
    }

    // submits the form to the API
    const onSubmit = e => {
        e.preventDefault();
        setError('');
        showLoader(true);

        axiosWithAuth()
            .post(`/restricted/users/${localStorage.getItem("id")}/messages`, {title: title, message: message, send_date: sendDate.format(), student_id: studentId})
            .then(res => {
                addReminder(res.data.NewMessage);
                formReset();
            })
            .catch(err => {
                setError('Unable to add reminder to database.');
                showLoader(false);
            });
    };

  return (
    <div className="reminder-form">
        <form className="form" onSubmit={onSubmit}>
            <h3 className="center">Set Reminder</h3>
            {error && <p className="error center">{error}</p>}
            <label>Title:
                <input 
                    type="text"
                    name="title"
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                />
            </label>
            <label>Student:
                <select value={studentId} onChange={e => setStudentId(e.target.value)} required>
                    <option value="self">Choose a student</option>
                    {/* maps over students to list all students the user can send a message to */}
                    {students.map(student => (
                        <option key={student.student_id} value={student.student_id}>{student.name}</option>
                    ))} 
                </select>
            </label>
            <label>Date:
                {/* allows the user to select a date */}
                <DateTime value={sendDate} onChange={e => setSendDate(e)} />
            </label>
            <textarea
                value={message}
                onChange={e => setMessage(e.currentTarget.value)}
                placeholder="your message"
            />
            <button className="submit" type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    </div>
  );
}
