import React from "react";

function TextArea({ register, error, label, id, placeholder, name }) {
  return (
    <div>
      <div className="mt-5 flex flex-col">
        <textarea
          {...register(id)}
          name={name}
          id={id}
          placeholder={placeholder}
          className="w-full  resize-none h-[6rem] border text-[#677B84] focus:border-[#677B84] border-[#677B84] ring-0 focus:ring-0 outline-none rounded-[15px] placeholder-[#677B84] px-4 py-2"
        />
        {error && (
          <div className="text-[#FF7171] text-[12px] flex items-center">
            <div className="ml-1">{error.message}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextArea;
