import { useField } from "formik";
import React from "react";

const InputFormik = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-3 mb-5">
      <label htmlFor={props.id} className="cursor-pointer font-bold">
        {label}
      </label>
      <input
        type={props.type}
        className="p-4 border border-gray-100 rounded-lg bg-white outline-none transition-all focus:border-blue-500"
        {...props}
        {...field}
      ></input>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm">{meta.error}</p>
      )}
    </div>
  );
};

export default InputFormik;
