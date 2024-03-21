import React, { memo, useEffect, useRef, useState } from 'react'

export default memo(function Task({ task, setTasks }) {
    const taskInputRef = useRef();
    const [taskUpdate, setTaskUpdate] = useState(false);

    useEffect(() => {
        if (taskUpdate) taskInputRef.current.focus();
    }, [taskUpdate]);

    const handleChange = () => {
        updateTask(task.id, taskInputRef.current.value);
        setTaskUpdate(false);
    }

    const taskCompleted = (id) => {
        setTasks(prev => prev.map((task) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        }));
    }

    const incrementCount = (id) => {
        setTasks(prev => prev.map((task) => {
            if (task.id === id) {
                return { ...task, count: task.count = task.count + 1 };
            }
            return task;
        }));
    }

    const updateTask = (id, text) => {
        setTasks(prev => prev.map((task) => {
            if (task.id === id) {
                return { ...task, task: task.text = text };
            }
            return task;
        }));
    }

    const deleteTask = (id) => {
        setTasks(prev => prev.filter((task) => {
            return task.id !== id;
        }));
    }

    return (
        <div key={task.id} className={`grid grid-cols-4 justify-items-start items-center gap-10 mx-auto`}>
            <div className="col-span-3 w-full flex items-center space-x-1">
                <input type="checkbox" name='checked' checked={task.completed} onChange={() => taskCompleted(task.id)} className="peer relative appearance-none shrink-0 w-4 h-4 border-2 border-gray-700 rounded-md mt-1 bg-gray-700 focus:outline-none focus:ring-offset-1 focus:ring-offset-gray-900 focus:ring-1 focus:ring-blue-500 checked:bg-blue-500 checked:border-0 disabled:border-steel-400 disabled:bg-steel-400" />

                <input type="text" ref={taskInputRef} name='task' defaultValue={task.task} className={`'relative w-full appearance-none text-lg text-wrap bg-black focus:outline-none ${task.completed ? 'line-through' : ''}`} onClick={() => incrementCount(task.id)} readOnly={!taskUpdate} />
                {task.count > 0 ?
                    <span>{task.count}</span>
                    :
                    ''
                }
            </div>

            <div className="flex space-x-1">
                {taskUpdate ?
                    <button type="submit" className="p-1 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-clip transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-emerald-300" onClick={handleChange}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                            <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(5.12,5.12)"><path d="M41.9375,8.625c-0.66406,0.02344 -1.27344,0.375 -1.625,0.9375l-18.8125,28.78125l-12.1875,-10.53125c-0.52344,-0.54297 -1.30859,-0.74609 -2.03125,-0.51953c-0.71875,0.22266 -1.25391,0.83203 -1.37891,1.57422c-0.125,0.74609 0.17578,1.49609 0.78516,1.94531l13.9375,12.0625c0.4375,0.37109 1.01563,0.53516 1.58203,0.45313c0.57031,-0.08594 1.07422,-0.41016 1.38672,-0.89062l20.09375,-30.6875c0.42969,-0.62891 0.46484,-1.44141 0.09375,-2.10547c-0.37109,-0.66016 -1.08594,-1.05469 -1.84375,-1.01953z"></path></g></g>
                        </svg>
                    </button>
                    :
                    <button type="submit" className="p-1 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-clip transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-emerald-300" onClick={() => setTaskUpdate(!taskUpdate)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                            <path fill="#fff" d="M 46.574219 3.425781 C 45.625 2.476563 44.378906 2 43.132813 2 C 41.886719 2 40.640625 2.476563 39.691406 3.425781 C 39.691406 3.425781 39.621094 3.492188 39.53125 3.585938 C 39.523438 3.59375 39.511719 3.597656 39.503906 3.605469 L 4.300781 38.804688 C 4.179688 38.929688 4.089844 39.082031 4.042969 39.253906 L 2.035156 46.742188 C 1.941406 47.085938 2.039063 47.453125 2.292969 47.707031 C 2.484375 47.898438 2.738281 48 3 48 C 3.085938 48 3.171875 47.988281 3.257813 47.964844 L 10.746094 45.957031 C 10.917969 45.910156 11.070313 45.820313 11.195313 45.695313 L 46.394531 10.5 C 46.40625 10.488281 46.410156 10.472656 46.417969 10.460938 C 46.507813 10.371094 46.570313 10.308594 46.570313 10.308594 C 48.476563 8.40625 48.476563 5.324219 46.574219 3.425781 Z M 45.160156 4.839844 C 46.277344 5.957031 46.277344 7.777344 45.160156 8.894531 C 44.828125 9.222656 44.546875 9.507813 44.304688 9.75 L 40.25 5.695313 C 40.710938 5.234375 41.105469 4.839844 41.105469 4.839844 C 41.644531 4.296875 42.367188 4 43.132813 4 C 43.898438 4 44.617188 4.300781 45.160156 4.839844 Z M 5.605469 41.152344 L 8.847656 44.394531 L 4.414063 45.585938 Z"></path>
                        </svg>
                    </button>
                }
                <button type="submit" className="p-1 rounded-md bg-rose-500 hover:bg-rose-600 text-white font-bold text-clip transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-rose-300" onClick={() => deleteTask(task.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                        <path fill="#fff" d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                    </svg></button>
            </div>
        </div>
    )
})