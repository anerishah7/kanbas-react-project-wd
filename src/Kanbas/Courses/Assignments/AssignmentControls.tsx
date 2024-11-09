import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useParams, useNavigate } from "react-router";
import ProtectedRouteFaculty from "../ProtectedRouteFaculty";

export default function AssignmentControls() {
      const { cid } = useParams();
      const navigate = useNavigate();
      const aid = "new";
  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      <ProtectedRouteFaculty>
      <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger me-1 float-end"
      onClick={() => {
        navigate(`/Kanbas/Courses/${cid}/Assignments/${aid}`);
      }}>
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment</button>
        <button id="wd-add-group-btn" className="btn btn-lg btn-secondary me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group</button>
        </ProtectedRouteFaculty>
      <div id="wd-view-progress" className="btn-group">
            <div  className="input-group">
                <span className="input-group-text"><CiSearch/></span>
                <input type="text" className="form-control" placeholder="Search..."/>
            </div>
        </div>
    </div>
);}
