import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {EditableSpan} from "../EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
  title: 'TodoList/EditableSpan',
  component: EditableSpan,
  argTypes: {
    value: {
      defaultValue: 'fewgreb',
      description: 'string',

    },
    onChange: {
      description: 'change span value',
    }
  },
  args: {
    onChange: action('onChange')
  }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanWithStartValueStory = Template.bind({});
EditableSpanWithStartValueStory.args = {};

export const EditableSpanWithoutStartValueStory = Template.bind({});
EditableSpanWithoutStartValueStory.args = {
  value: 'aaaaaaaa',
};