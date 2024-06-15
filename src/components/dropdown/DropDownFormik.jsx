import React, { useEffect, useState } from "react";
import useClickOutSide from "../../hook/useClickOutSide";
import { useField } from "formik";

const DropDownFormik = ({
  labelText,
  name,
  data,
  dropdownLabel = "Select your job",
  setValue,
}) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const [label, setLabel] = useState(dropdownLabel);
  const handleClickDropDownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.textContent);
  };
  const [field, meta] = useField({ name });
  useEffect(() => {
    if (field.value === "") setLabel(dropdownLabel);
  }, [field.value]);
  return (
    <div className="flex flex-col gap-3 mb-5">
      <label className="cursor-pointer font-bold">{labelText}</label>
      <div className="relative" ref={nodeRef}>
        <div
          className="p-5 rounded-lg border border-gray-100 bg-white flex items-center justify-between cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <span>{label}</span>
        </div>
        <div
          className={`absolute top-full left-0 w-full rounded-lg bg-white ${
            show ? "" : "opacity-0 invisible"
          }`}
        >
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <div
                className="p-5 transition-all cursor-pointer hover:bg-gray-100"
                onClick={handleClickDropDownItem}
                data-value={item.value}
                key={item.id}
              >
                {item.text}
              </div>
            ))}
        </div>
      </div>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm">{meta.error}</p>
      )}
    </div>
  );
};

export default DropDownFormik;
