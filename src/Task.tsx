import React, {ChangeEvent, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./Todolist1";

type TaskPropsType = {
    todolistId: string
    taskId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TaskType>(state =>
        state.tasks[props.todolistId].filter(t => t.id === props.taskId)[0])
    const dispatch = useDispatch();

    const onClickHandler = () => dispatch(removeTaskAC(props.taskId, props.todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.taskId, newIsDoneValue, props.todolistId));
    }
    const onTitleChangeHandler = useCallback( (newValue: string) => {
        dispatch(changeTaskTitleAC(props.taskId, newValue, props.todolistId));
    }, [dispatch, props.todolistId, props.taskId] );


    return <div key={props.taskId} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})