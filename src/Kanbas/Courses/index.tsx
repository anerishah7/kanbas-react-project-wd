import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Quizzes from "./Quizzes";
import PeopleTable from "./People/Table";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa6";
import { addAssignment, updateAssignment, deleteAssignment } from "./Assignments/reducer";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const assignmentsList = assignments.filter(
    (assignment: { course: string | undefined; }) => assignment.course === cid
  );
  const dispatch = useDispatch();
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      {course && course.name}  &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
          <div className="d-flex">
            <div className="d-none d-md-block">
            <CoursesNavigation />
            </div>
            <div className="flex-fill">
          <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:aid" element={<AssignmentEditor assignments={assignmentsList}
                  />}
                  />
              <Route path="Quizzes" element={<Quizzes />} />
              <Route path="People" element={<PeopleTable />} />
            </Routes>
            </div></div>
    </div>
);}
