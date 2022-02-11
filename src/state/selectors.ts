import {AppRootStateType} from "./store";

export const todolistsSelector = (state: AppRootStateType) => state.todolists
export const tasksSelector = (state: AppRootStateType) => state.tasks