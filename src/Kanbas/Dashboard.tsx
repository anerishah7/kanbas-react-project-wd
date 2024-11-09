import React, { useState }  from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRouteFaculty from "./Courses/ProtectedRouteFaculty";
import ProtectedRouteStudent from "./ProtectedRouteStudent";

export default function Dashboard({ courses, course, setCourse, addNewCourse,deleteCourse, 
  updateCourse, 
  enrollments, addNewEnrollment, deleteEnrollment 
}: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; 
  enrollments: any[]; addNewEnrollment: (course:any, user:any) => void;
  deleteEnrollment: (course:any, user:any) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enroll_button_click, setEnrollButtonClick] = useState(0);
  const count_enroll_button_click = () => {
    setEnrollButtonClick(enroll_button_click + 1);
  };
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> 
      <hr />
      <ProtectedRouteStudent>
      <button className="btn btn-primary float-end"
                  id="wd-enrollment"
                  onClick={count_enroll_button_click} > Enrollments </button>
        </ProtectedRouteStudent>
      <ProtectedRouteFaculty>
      <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={addNewCourse} > Add </button>
           <button className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click"> Update </button>
      </h5><br />
      <input value={course.name} className="form-control mb-2" 
        onChange={(e) => setCourse({ ...course, name: e.target.value }) }/>
      <textarea value={course.description} className="form-control"
        onChange={(e) => setCourse({ ...course, description: e.target.value }) }/>
        </ProtectedRouteFaculty>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> 
      <hr />

      <div id="wd-dashboard-courses" className="row">
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {/* Show only Enrolled Courses */}
      {enroll_button_click>=2 && 
      courses.filter((course) =>
          enrollments.some(
            (enrollment: { user: any; course: any; }) =>
              enrollment.user === currentUser._id &&
              enrollment.course === course._id
          ))
        .map((course) => (
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to={`/Kanbas/Courses/${course._id}/Home`} >
            <img src={course.image}  width="100%" height={160}/>
            <div  className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              {course.name}
              </h5>
              <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
              {course.description}
              </p>
              <button className="btn btn-primary"> Go </button>
                <ProtectedRouteStudent>
                <button className="btn btn-danger float-end" id="wd-enroll-course-click" onClick={(event) => {
                    event.preventDefault();
                    deleteEnrollment(course._id, currentUser._id);
                  }}>
                  UnEnroll </button>
                </ProtectedRouteStudent>
            </div>
          </Link>
          </div>
        </div>
      ))}
      {/* Show all courses */}
      {enroll_button_click===1 && 
      enrollments.map((enrollment) => (enrollment)) && 
      courses
        .map((course) => (
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to={`/Kanbas/Courses/${course._id}/Home`}>
            <img src={course.image}  width="100%" height={160}/>
            <div  className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              {course.name}
              </h5>
              <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
              {course.description}
              </p>
             {enrollments.some(
      (enrollment: { user: string; course: string; }) =>
      enrollment.user === currentUser._id &&
      enrollment.course === course._id
        ) && <button className="btn btn-primary" > Go </button> }
              <ProtectedRouteFaculty>
                <button onClick={(event) => {
                  event.preventDefault();
                  deleteCourse(course._id);
                }} className="btn btn-danger float-end"
                id="wd-delete-course-click">
                Delete
              </button>
                <button id="wd-edit-course-click"
                  onClick={(event) => {
                    event.preventDefault();
                    setCourse(course);
                  }}
                  className="btn btn-warning me-2 float-end" >
                  Edit
                </button>
                </ProtectedRouteFaculty>
                  {enrollments.some(
      (enrollment: { user: string; course: string; }) =>
      enrollment.user === currentUser._id &&
      enrollment.course === course._id
        ) && <button className="btn btn-danger float-end" id="wd-enroll-course-click" 
                    onClick={(event) => {
                      event.preventDefault();
                      deleteEnrollment(course._id, currentUser._id);
                    }}>
                    UnEnroll </button>}
                
                { !enrollments.some(
      (enrollment: { user: string; course: string; }) =>
      enrollment.user === currentUser._id &&
      enrollment.course === course._id
        ) && <button className="btn btn-success float-end" id="wd-unenroll-course-click" 
                  onClick={(event) => {
                    event.preventDefault();
                    addNewEnrollment(course._id, currentUser._id);
                  }}>
                   Enroll </button>}
            </div>
          </Link>
          </div>
        </div>
      ))}
       <ProtectedRouteFaculty>
        {/* Show all courses */}
      {courses
        .map((course) => (
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to={`/Kanbas/Courses/${course._id}/Home`}>
            <img src={course.image}  width="100%" height={160}/>
            <div  className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              {course.name}
              </h5>
              <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
              {course.description}
              </p>
              <button className="btn btn-primary" > Go </button>
              <ProtectedRouteFaculty>
                <button onClick={(event) => {
                  event.preventDefault();
                  deleteCourse(course._id);
                }} className="btn btn-danger float-end"
                id="wd-delete-course-click">
                Delete
              </button>
                <button id="wd-edit-course-click"
                  onClick={(event) => {
                    event.preventDefault();
                    setCourse(course);
                  }}
                  className="btn btn-warning me-2 float-end" >
                  Edit
                </button>
                </ProtectedRouteFaculty>
            </div>
          </Link>
          </div>
        </div>
      ))}
        </ProtectedRouteFaculty>
      
      </div>
    </div>
    </div>
  );
}
