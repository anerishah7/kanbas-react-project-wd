import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedRouteCourse({ children, enrollments }: { children: any, enrollments: any[] }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const {enrollments} = useSelector((state: any) => state.enrollmentsReducer);
  const {cid} = useParams();
  const enrolled = enrollments.some(
    (enrollment: { user: string; course: string; }) =>
    enrollment.user === currentUser._id &&
    enrollment.course === cid
);
console.log(enrolled);
  if (currentUser.role === "STUDENT") {
    if (enrolled) {
      return children;
    }
    return <Navigate to="/Kanbas/Dashboard" /> ;
  } else {
    return children;
}}
