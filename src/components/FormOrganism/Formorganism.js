import InputType from "@/atoms/InputType";
import TextArea from "@/atoms/TextArea";
import React from "react";

function Forms(props) {
  return (
    <div>
      <div className="  ">
        <div className="flex md:mx-0 mx-auto rounded-[15px] w-[250px]   bg-white">
          <div className="absolute right-3 top-3 cursor-pointer p-2">
            <img
              src="./assets/images/Close.svg"
              className="h-auto w-auto cursor-pointer"
              onClick={props.onClick}
            />
          </div>
        </div>

        <form
          className="text-[16px] font-semibold leading-[30px]"
          onSubmit={props.onSubmit}>
          <div className="grid grid-cols-2 md:gap-5 gap-2 mt-5 t">
            <InputType
              id="question"
              name="question"
              type="text"
              placeholder="Question"
              register={props.register}
              error={props.errors.question}
              defaultValue={
                props.isNewQuestion ? "" : props.previousData.question
              }
            />

            <InputType
              id="questions_comments"
              name="questions_comments"
              type="text"
              placeholder="Questions Comments"
              register={props.register}
              error={props.errors.questions_comments}
              defaultValue={
                props.isNewQuestion ? "" : props.previousData.questions_comments
              }
            />
          </div>

          <TextArea
            id="questions_explanation"
            name="questions_explanation"
            register={props.register}
            error={props.errors.questions_explanation}
            placeholder="Questions Explanation"
            defaultValue={
              props.isNewQuestion
                ? ""
                : props.previousData.questions_explanation
            }
          />

          <div className="mt-5">
            <input
              type="submit"
              className="md:max-w-[200px] cursor-pointer flex justify-center items-center h-12 w-full text-center border-[1px] bg-[rgba(0, 0, 0, 0.05)] py-[2px] px-[5px] rounded-[15px] font-semibold text-[16px] leading-[22px] border-solid border-black"
              style={{
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forms;
