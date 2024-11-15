import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import * as db from "./Database";
import { useState } from "react";
import store from "./store";
import { Provider } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedRouteCourse from "./Account/ProtectedRouteCourse"; 

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });
  const addNewCourse = () => {
    setCourses([...courses, { ...course, _id: new Date().getTime().toString() }]);
  };
  const deleteCourse = (courseId: any) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) { 
          return course;
        } else {
          return c;
        }
      })
    );
  };
  const [ enrollments, setEnrollments ] = useState<any[]>(db.enrollments);
  const [enrollment, setEnrollment] = useState<any>({
    _id: "1234", user: "New User", course: "New Course",
  });
  const addNewEnrollment = (course_id: any, user_id:any) => {
    setEnrollments([...enrollments, { ...enrollment, _id: new Date().getTime().toString(), 
      course: course_id, user: user_id }]);
  };
  const deleteEnrollment = (course_id: any, user_id:any) => {
    setEnrollments(enrollments.filter((enrollment) => 
      !(enrollment.course === course_id && enrollment.user === user_id)));
  };
  return (
    <Provider store={store}>
    <div id="wd-kanbas">
            <KanbasNavigation />
          <div className="wd-main-content-offset p-3">
          <Routes>
              <Route path="/" element={<Navigate to="/Kanbas/Dashboard" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route path="Dashboard" element={
                  <ProtectedRoute>
                    <Dashboard
                      courses={courses}
                      course={course}
                      setCourse={setCourse}
                      addNewCourse={addNewCourse}
                      deleteCourse={deleteCourse}
                      updateCourse={updateCourse}
                      enrollments={enrollments}
                      addNewEnrollment={addNewEnrollment}
                      deleteEnrollment={deleteEnrollment}
                      />
                  </ProtectedRoute>
                } />
              <Route path="/Courses/:cid/*" element=
              {<ProtectedRoute> <ProtectedRouteCourse enrollments={enrollments}>
                <Courses courses={courses} />
               </ProtectedRouteCourse> </ProtectedRoute>} />
              <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
          </div>
    </div>
    </Provider>
  );
}
