import React from 'react'
import { Typography } from 'antd';

const { Title} = Typography

export const AboutPage = (props) => {
    return (
        <div>
            <Title >About This App</Title>
            <p>This App Lets You do all that much more effectively,
             adding and dropping tasks to reorder them, attaching
              a note to a task with additional thoughts. Shortly, It's An Ultimate Productivity</p>
        </div>
    )
}
