import './App.css'
import {Suspense} from "react";
import {Route, Routes} from "react-router-dom";


import {Layout} from "./layout"
import {Loading} from "./components";
import {TaskDetail, TaskPage} from "./pages";
import {useTasks} from "./hooks";

function App() {
    const {tasks, getTasks,  isTasksLoading, isTasksError} = useTasks();

    if (isTasksLoading || !tasks || tasks.length === 0) {
        return <Loading/>;
    }

    if (isTasksError) {
        return (<h1>Error loading tasks</h1>);
    }

    return (
        <Layout>
            <Suspense fallback={<Loading/>}/>
            <Routes>
                <Route
                    path="/"
                    element={<TaskPage
                        tasks={tasks}
                        isTasksLoading={isTasksLoading}
                        getTasks={getTasks}
                    />}
                />
                <Route path="/tasks/:taskId" element={<TaskDetail tasks={tasks} getTasks={getTasks}/>}/>
            </Routes>
        </Layout>)
}

export default App
