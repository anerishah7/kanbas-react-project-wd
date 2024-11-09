import Modules from "../Modules";
import CourseStatus from "./Status";
import ProtectedRouteFaculty from "../ProtectedRouteFaculty";

export default function Home() {
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill">
          <Modules />
        </div>
        <div className="d-none d-md-block" style={{padding:"10px"}}>
          <ProtectedRouteFaculty>
            <CourseStatus />
          </ProtectedRouteFaculty>
          </div>
        </div>
  );
}
