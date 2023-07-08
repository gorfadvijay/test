import React from "react";
const InputType = ({
  name,
  error,
  id,
  label,
  placeholder,
  type,
  maxLength,
  className,
  disabled,
  onFocus,
  onBlur,
  max,
  register,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col w-full">
      <input
        className={`${className} h-12 border text-[#677B84] focus:border-[#677B84] border-[#677B84] ring-0 focus:ring-0 outline-none rounded-[15px] placeholder-[#677B84] px-4`}
        {...register(id)}
        name={name}
        id={id}
        label={label}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        onFocus={onFocus}
        onBlur={onBlur}
        max={max}
        // defaultValue={defaultValue}
      />

      {error && (
        <div className="text-[#FF7171] text-[12px] flex items-center">
          <div>
            {" "}
            <img
              src="./assets/images/ValidationError.svg"
              alt="error"
              className="h-4 w-auto"
            />
          </div>
          <div className="ml-1">{error.message}</div>
        </div>
      )}
    </div>
  );
};

export default InputType;
