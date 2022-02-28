import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from "../Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
  title: 'TodoList/Task',
  component: Task,
  argType: {
    todolistId: {
      description: 'string',
    },
    taskId: {
      description: 'string',
    },
  },
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStory = Template.bind({});
TaskStory.args = {
  todolistId: 'todolistId1',
  taskId: '11'
};