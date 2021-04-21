import React from 'react'
import { PartProps } from '../utils'

const Part: React.FC<PartProps> = ({ course }) => {

  switch (course.type) {
      case "normal":
          return (
              <div>
                <p><strong>{course.name} {course.exerciseCount}</strong></p>
                <p>{course.description}</p>
              </div>
          )
      case "groupProject":
          return (
            <div>
              <p><strong>{course.name} {course.exerciseCount}</strong></p>
              <p>project exercises {course.groupProjectCount}</p>
          </div>
          )
      case "submission":
          return (
            <div>
              <p><strong>{course.name} {course.exerciseCount}</strong></p>
              <p>submit to {course.exerciseSubmissionLink}</p>
        </div>
          )
      case "special":
        return (
            <div>
              <p><strong>{course.name} {course.exerciseCount}</strong></p>
              <p>{course.description}</p>
              <p> required skills: {course.requirements.map(r => <span key={r}> {r}</span>)}</p>
            </div>
        )
      default:
        return null
  }
}

export default Part