// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartBase, Description {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase, Description {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface Description extends CoursePartBase {
  description: string;
}

interface CourseSpecialPart extends CoursePartBase, Description {
  type: "special"
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

export interface CourseProps {
  courses: CoursePart[];
}

export interface PartProps {
  course: CoursePart;
}

export interface TotalProps {
  courseParts: { exerciseCount: number }[];
}