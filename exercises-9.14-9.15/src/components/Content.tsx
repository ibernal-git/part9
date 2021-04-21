import React from 'react'
import { CourseProps } from '../utils'
import Part from './Part'

const Content: React.FC<CourseProps> = ({courses}) => {
  return (
    <div>
        {courses.map((course) =>
            <Part key={course.name} course={course} />
        )}
    </div>
)
}

export default Content