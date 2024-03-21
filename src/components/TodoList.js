import React, { useRef, useState } from 'react';
import Task from './Task';
import VirtualList from './VirtualList';

const bigArray = new Array(10000).fill(0).map((v, index) => ({ id: index + 1, task: 'task id :' + index, completed: false, count: 0 }));

function TodoList() {
    const containerHeight = 450;
    const containerWidth = 450;
    const rowHeight = 32;
    const taskInputRef = useRef(null);
    const [tasks, setTasks] = useState(bigArray);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskInputRef.current.value !== '') {
            const lastId = tasks[tasks.length - 1]?.id;
            const id = lastId ? lastId + 1 : 1;
            const newTask = { id: id, task: taskInputRef.current.value }
            setTasks([...tasks, newTask]);
            taskInputRef.current.value = '';
        }
    }

    function renderTask(task) {
        return (
            <Task
                key={task.id}
                task={task}
                setTasks={setTasks}
            />
        );
    }

    return (
        <div className="text-white overflow-hidden">
            <header className="mt-10">
                <p className="font-bold text-4xl text-center">Your To-Do list</p>
            </header>
            <main className="flex flex-col justify-center items-center mt-14 h-[80vh] w-full">
                <form className="grid grid-cols-3 items-center w-1/3" onSubmit={handleSubmit}>
                    <input ref={taskInputRef} name="task" className="col-span-2 w-full px-4 py-2 rounded-l-md border border-gray-700 bg-gray-700 text-gray-200 outline-none" placeholder="Enter your task" />
                    <button type="submit" className="w-full px-4 py-2 rounded-r-md bg-blue-500 hover:bg-blue-600 text-white font-bold text-clip transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-blue-300">Add task</button>
                </form>

                <VirtualList
                    itemList={tasks}
                    containerHeight={containerHeight}
                    containerWidth={containerWidth}
                    rowHeight={rowHeight}
                    renderItem={renderTask}
                />
            </main>
        </div>
    );
}

export default TodoList