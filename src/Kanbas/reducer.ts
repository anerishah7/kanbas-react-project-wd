import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";
const initialState = {
  enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    addEnrollment: (state, { payload: enrollment }) => {
      const newEnrollment: any = {
        _id: new Date().getTime().toString(),
        user: enrollment.user,
        course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    // deleteAssignment: (state, { payload: enrollmentId }) => {
    //   state.enrollments = state.enrollments.filter(
    //     (m: any) => m._id !== enrollmentId);
    // },
    // updateAssignment: (state, { payload: enrollment }) => {
    //   state.enrollments = state.enrollments.map((m: any) =>
    //     m._id === enrollment._id ? enrollment : m
    //   ) as any; 
    // },
}});
export const { 
    addEnrollment
} =
enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;