import React, {useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {FilterValuesType, TodolistType} from "./AppWithRedux";
import {addTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todolistId: string
    filter: FilterValuesType
}

export const Todolist1 = React.memo((props: PropsType) => {
    console.log("Todolist1")

    const todolist = useSelector<AppRootStateType, TodolistType>(state =>
        state.todolists.filter(tl => tl.id === props.todolistId)[0]);
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state =>
        state.tasks[todolist.id]);
    const dispatch = useDispatch();

    if (todolist.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todolistId))
    }, [dispatch, props.todolistId]);
    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(props.todolistId));
    }, [dispatch, props.todolistId]);
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(props.todolistId, title));
    }, [dispatch, props.todolistId]);

    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todolistId, "all")), [dispatch, props.todolistId]);
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todolistId, "active")), [dispatch, props.todolistId]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todolistId, "completed")), [dispatch, props.todolistId]);

    return <div>
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    return <Task
                        key={t.id}
                        todolistId={props.todolistId}
                        taskId={t.id}
                    />
                    /*const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id));
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, props.id));
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>*/
                })
            }
        </div>
        <div>
            <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
});


