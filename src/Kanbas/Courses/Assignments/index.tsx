import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useParams } from "react-router";
import { deleteAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import ProtectedRouteFaculty from "../ProtectedRouteFaculty";
import { FaTrash } from "react-icons/fa";
import DeleteAssignment from "./DeleteAssignment";
import { Link } from "react-router-dom";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const [assignmentId, setAssignmentId] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <AssignmentControls /><br /><br />
      <ul id="wd-assignments" className="list-group rounded-0">
          <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown className="me-2 fs-3" />
             <b>ASSIGNMENTS</b>
             <AssignmentControlButtons/>
             </div>
            <ul className="wd-lessons list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li className="wd-lesson list-group-item p-3 ps-1">
                <table border={0} width="100%">
                  <td valign = "middle"><BsGripVertical className="me-2 fs-3" /></td>
                  <td valign = "middle"><HiOutlinePencilSquare className="me-2 fs-3 green" /></td>
                  <td><table >
                      <tr>
                    <Link className="black"
                    // onClick={() => dispatch(setAssignment(assignment))}
                    to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                        >
                    {assignment.title}
                    </Link>   
                    </tr>
                      <tr> <span className="red">Multiple Modules </span>| <b>Not available until </b> 
                      {new Date(assignment.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}  
                      &nbsp; at 12:00 am | </tr>
                      <tr><b>Due </b> 
                      {new Date(assignment.due_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} 
                      &nbsp; at 11:59 pm | {assignment.points} pts</tr>
                  </table></td>
                  <td valign = "middle">
                    <ProtectedRouteFaculty>
                    <button id="wd-delete-assignment-btn" className="btn btn-lg me-1 float-end" 
                    data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog" 
                    onClick={() => setAssignmentId(assignment._id)}>
                      <FaTrash className="text-danger me-3 mb-1 float-end" />
                      {/* <div>{assignment._id}</div> */}
                    </button>
                    
                  </ProtectedRouteFaculty>
                    <LessonControlButtons /></td>
                </table>
                </li>
                 ))}
            </ul>
          </li>
        </ul>
        <DeleteAssignment dialogTitle="Delete Assignment ?" assignment_id={assignmentId}
                      deleteAssignment={(assignment_id) => {
                        dispatch(deleteAssignment(assignment_id));
                      }} />
    </div>
);}