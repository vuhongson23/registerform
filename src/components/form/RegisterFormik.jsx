import React from "react";
import InputFormik from "../input/InputFormik";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";
import RadioFormik from "../radio/RadioFormik";
import CheckboxFormik from "../checkbox/CheckboxFormik";
import DropDownFormik from "../dropdown/DropDownFormik";

const dropdownData = [
  {
    id: 1,
    value: "teacher",
    text: "Teacher",
  },
  {
    id: 2,
    value: "developer",
    text: "Developer",
  },
  {
    id: 3,
    value: "doctor",
    text: "Doctor",
  },
  {
    id: 4,
    value: "student",
    text: "Student",
  },
];

const RegisterFormik = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        gender: "male",
        job: "",
        term: false,
      }}
      validationSchema={yup.object({
        username: yup.string().required("Please enter your username"),
        email: yup
          .string()
          .email("Please enter valid email address")
          .required("Please enter your email address"),
        password: yup
          .string()
          .min(8, "Your password must have at least 8 characters or greater")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            {
              message:
                "Your password must have at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
            }
          )
          .required("Please enter your password"),
        gender: yup
          .string()
          .required("Please enter your gender")
          .oneOf(["male", "female"], "You can only select male or female"),
        job: yup
          .string()
          .required("Please select your job")
          .oneOf(["teacher", "developer", "docter", "student"]),
        term: yup
          .boolean()
          .oneOf([true], "Please accept the terms and conditions"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
          resetForm();
        }, 5000);
      }}
    >
      {(formik) => {
        const watchGender = formik.values.gender;
        return (
          <form
            onSubmit={formik.handleSubmit}
            className="max-w-[300px] mx-auto my-10"
          >
            <InputFormik
              name="username"
              placeholder="Enter your username"
              id="username"
              label="Username"
              type="text"
            ></InputFormik>
            <InputFormik
              name="email"
              placeholder="Enter your email address"
              id="email"
              label="Email address"
              type="email"
            ></InputFormik>
            <InputFormik
              name="password"
              placeholder="Enter your password"
              id="password"
              label="Password"
              type="password"
            ></InputFormik>
            <div className="flex flex-col gap-3 mb-5">
              <label className="cursor-pointer font-bold">Gender</label>
              <div className="flex items-center gap-5">
                <RadioFormik
                  name="gender"
                  value="male"
                  checked={watchGender === "male"}
                  label="Male"
                ></RadioFormik>
                <RadioFormik
                  name="gender"
                  value="female"
                  checked={watchGender === "female"}
                  label="Female"
                ></RadioFormik>
              </div>
            </div>
            <DropDownFormik
              labelText="Your job"
              data={dropdownData}
              name="job"
              setValue={formik.setFieldValue}
            ></DropDownFormik>
            <CheckboxFormik name="term">
              I accept the terms and conditions
            </CheckboxFormik>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="font-semibold w-full text-white rounded-lg bg-blue-500 p-5 mt-5"
            >
              {formik.isSubmitting ? (
                <div className="h-5 w-5 rounded-full border-2 border-white border-t-2 border-t-transparent mx-auto animate-spin"></div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default RegisterFormik;
