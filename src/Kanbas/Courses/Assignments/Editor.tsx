import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor(
    { assignments }:
    { assignments: any[] } ) {
    const { cid } = useParams();
    const { aid } = useParams();
    const assignment = aid==="new" ? null : assignments
                        .filter((assignment: any) => assignment._id === aid);
    const date = new Date();
    const dispatch = useDispatch();
    const [assignmentTitle, setAssignmentTitle] = useState(assignment===null ? "New Assignment" : `${assignment[0].title}`);
    const [assignmentDescription, setAssignmentDescription] = useState(assignment===null ? "New Assignment Description" : `${assignment[0].description}`);
    const [assignment_start_date, setStartDate] = useState(assignment===null ? date.toISOString().slice(0, 10) : `${assignment[0].start_date}`);
    const [assignment_due_date, setDueDate] = useState(assignment===null ? date.toISOString().slice(0, 10) : `${assignment[0].due_date}`);
    const [assignmentPoints, setAssignmentPoints] = useState(assignment===null ? 100 : `${assignment[0].points}`);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    return (
        <div id="wd-assignments-editor">
            <form id="wd-text-fields">
                <label htmlFor="wd-name">Assignment Name</label><br />
                <input id="wd-name" className="form-control" 
                defaultValue={assignment===null ? "New Assignment" :`${assignment[0].title}` }
                onChange={(e) => setAssignmentTitle(e.target.value)} readOnly={!isFaculty}/>
               
                <br />
                <textarea id="wd-description" className="form-control" rows={10}
                onChange={(e) => setAssignmentDescription(e.target.value)} readOnly={!isFaculty}>
                    {assignment===null ? "New Assignment Description" : `${assignment[0].description}`} 
                </textarea>
                <br />
                
                <div className="row padded">
                    <div className="col-12 col-md-3 col-xl-2 right-justify">
                        <span className="align-items-right">
                            <label htmlFor="wd-points">Points</label>
                        </span>
                    
                    </div>
                    <div className="col-12 col-md-3 col-xl-10">
                    <input id="wd-points" defaultValue={assignment===null ? 100 :`${assignment[0].points}` } 
                    className="form-control" onChange={(e) => setAssignmentPoints(e.target.value)} readOnly={!isFaculty}/>
                    </div>
                </div>

                <div className="row padded">
                    <div className="col-12 col-md-3 col-xl-2 right-justify">
                        <span className="align-items-right">
                        <label htmlFor="wd-group">Assignment Group</label>
                        </span>
                    
                    </div>
                    <div className="col-12 col-md-3 col-xl-10">
                    <select id="wd-group" className="form-select" disabled={!isFaculty}>
                        <option selected value="ASSIGNMENTS">ASSIGNMENTS </option>
                        <option value="QUIZ">QUIZ </option>
                        <option value="LABS">LABS </option>
                        </select>
                    </div>

                </div>

                <div className="row padded">
                    <div className="col-12 col-md-3 col-xl-2 right-justify">
                        <span className="align-items-right">
                        <label htmlFor="wd-display-grade-as">Display Grade As</label>
                        </span>
                    
                    </div>
                    <div className="col-12 col-md-3 col-xl-10">
                    <select id="wd-display-grade-as" className="form-select" disabled={!isFaculty}>
                        <option selected value="PERCENTAGE">PERCENTAGE</option>
                        <option value="GRADE">GRADE</option>
                        <option value="GPA">GPA</option>
                        </select>
                    </div>

                </div>

                <div className="row padded">
                    <div className="col-12 col-md-3 col-xl-2 right-justify">
                        <span className="align-items-right">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                        </span>
                    </div>
                    <div className="col-12 col-md-3 col-xl-10 padded border">
                            <div className="row-2">
                            <select id="wd-submission-type" className="form-select" disabled={!isFaculty}>
                            <option selected value="ONLINE">ONLINE</option>
                            <option value="IN PERSON">IN PERSON</option>
                            </select>
                            </div>

                            <div className="row-2 padded">
                            
                                <label htmlFor="wd-online-entry-options"> <b>Online Entry Options</b></label> <br/>
                            
                                <input type="checkbox" name="check-online-entry-options" id="wd-text-entry" disabled={!isFaculty}/>
                                <label htmlFor="wd-text-entry">Text Entry</label><br/>

                                <input type="checkbox" name="check-online-entry-options" id="wd-website-url" disabled={!isFaculty}/>
                                <label htmlFor="wd-website-url">Website URL</label><br/>

                                <input type="checkbox" name="check-online-entry-options" id="wd-media-recordings" disabled={!isFaculty}/>
                                <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

                                <input type="checkbox" name="check-online-entry-options" id="wd-student-annotation" disabled={!isFaculty}/>
                                <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

                                <input type="checkbox" name="check-online-entry-options" id="wd-file-upload" disabled={!isFaculty}/>
                                <label htmlFor="wd-file-upload">File Uploads</label><br/>
                            </div>
                    </div>
                </div>

                <div className="row padded">
                    <div className="col-12 col-md-3 col-xl-2 right-justify">
                        <span className="align-items-right">
                        Assign
                        </span>
                    </div>
                    <div className="col-12 col-md-3 col-xl-10 padded border">
                            <div className="row-2">
                            <label htmlFor="wd-assign-to"><b>Assign To</b></label> <br/>
                            <select id="wd-assign-to" className="form-select" disabled={!isFaculty}>
                            <option selected value="Everyone">Everyone</option>
                            </select>
                            </div>

                            <div className="row">
                            <div className="col-12 col-md-2 col-xl-4 padded">
                                <label htmlFor="wd-due-date"><b>Due</b></label> <br/>
                                <input type="date" id="wd-due-date" 
                                defaultValue={assignment===null ? date.toISOString().slice(0, 10) : `${assignment[0].due_date.replaceAll('/', '-')}` }
                                className="form-control" onChange={(e) => setDueDate(e.target.value)} readOnly={!isFaculty}/>
                            </div>
                            <div className="col-12 col-md-2 col-xl-4 padded">
                                <label htmlFor="wd-available-from"><b>Available From</b></label> <br/>
                                <input type="date" id="wd-available-from" 
                                defaultValue={assignment===null ? date.toISOString().slice(0, 10) : `${assignment[0].start_date.replaceAll('/', '-')}` }
                                className="form-control" onChange={(e) => setStartDate(e.target.value)} readOnly={!isFaculty}/>
                            </div>
                            <div className="col-12 col-md-2 col-xl-4 padded">
                                <label htmlFor="wd-available-until"><b>Until</b></label> <br/>
                                <input type="date" id="wd-available-until" 
                                defaultValue={assignment===null ? date.toISOString().slice(0, 10) : `${assignment[0].due_date.replaceAll('/', '-')}` } 
                                className="form-control" onChange={(e) => setDueDate(e.target.value)} readOnly={!isFaculty}/>
                            </div>
                            </div>

                    </div>
                </div>
                <hr/>
                <div className="text-nowrap">
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger me-1 float-end" hidden={!isFaculty}
                onClick={assignment===null ? 
                        () => {
                        dispatch(addAssignment({ title: assignmentTitle, course: cid 
                            , description: assignmentDescription, points: assignmentPoints, 
                            start_date: assignment_start_date, due_date: assignment_due_date
                        }));
                        setAssignmentTitle("");
                        setAssignmentDescription("");
                        setAssignmentPoints("");
                        setStartDate("");
                        setDueDate("");
                      }
                    : 
                    () => {
                        dispatch(updateAssignment({ ...assignment[0], title: assignmentTitle 
                            , description: assignmentDescription, points: assignmentPoints, 
                            start_date: assignment_start_date, due_date: assignment_due_date
                        }))}
                }
                >Save</Link>
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-1 float-end">Cancel</Link>
                </div>

            </form>
        </div>
);}
