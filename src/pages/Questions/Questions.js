import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment/moment";
import FormOrganism from "@/components/FormOrganism/Formorganism";
import TableComponent from "@/components/TableComponent/TableComponent";

function Questions(props) {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  let schema = yup.object({
    question: yup.string().required("Question Name is required"),
    questions_explanation: yup
      .string()
      .required("Questions explanation is required"),
    questions_comments: yup.string().required("Questions comments is required"),
  });

  const isNewQuestion =
    typeof isNewQuestionProp !== "undefined" ? isNewQuestionProp : true;

  const previousData = {
    question: "Previous Question",
    questions_comments: "Previous Comments",
    questions_explanation: "Previous Explanation",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      question: isNewQuestion ? "" : previousData.question,
      questions_comments: isNewQuestion ? "" : previousData.questions_comments,
      questions_explanation: isNewQuestion
        ? ""
        : previousData.questions_explanation,
      reviewername: isNewQuestion ? "" : previousData.reviewername,
    },
  });

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4201/api/v1/question");
      console.log("responseresponseresponse", response);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const closeModal = () => {
    setIsSuccessModalOpen(false);
    props.CloseModal();
    setMessage("");
    setIsError("");
    reset();
  };

  const handleUpdate = (id, row) => {
    console.log("handleUpdatehandleUpdate", row);
    setUpdateId(id);
    setValue("question", row.question);
    setValue("questions_comments", row.questions_comments);
    setValue("questions_explanation", row.questions_explanation);
    setValue("reviewername", row.reviewername);

    props.openModal();
  };

  const handleAdd = () => {
    setUpdateId(null);
    props.openModal();
  };

  const onSubmit = async (data) => {
    console.log("onSubmitonSubmitonSubmitonSubmit", data);
    try {
      if (updateId) {
        const response = await axios.put(
          `http://localhost:4201/api/v1/question/${updateId}`,
          {
            question: data.question,
            questions_comments: data.questions_comments,
            questions_explanation: data.questions_explanation,
            reviewername: data.reviewername,
          }
        );

        if (response.status === 200) {
          toast.success("Question updated successfully");
          fetchData();
          closeModal();
        } else {
          setIsError("Something went wrong. Please try again later.");
        }
      } else {
        const requestData = {
          question: data.question,
          questions_explanation: data.questions_explanation,
          questions_comments: data.questions_comments,
          reviewername: data.reviewername,
        };
        console.log("requestData", requestData);
        const response = await axios.post(
          "http://localhost:4201/api/v1/question",
          requestData
        );

        if (response.status === 201) {
          const responseData = response.data;
          toast.success("Question added successfully");
          fetchData();
          reset();
          closeModal();
        } else {
          setIsError("Something went wrong. Please try again later.");
        }
      }
    } catch (err) {
      setIsError("Something went wrong. Please try again later.");
      toast.error("Error updating question");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4201/api/v1/question/${id}`
      );
      toast.success("Question deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className="text-base mx-auto flex flex-col justify-center items-center font-medium leading-4 text-black my-4">
          <div
            className=" text-center border-[1px]  bg-[rgba(0, 0, 0, 0.05)] py-[15px] px-[30px] rounded-[15px] font-medium button text-[18px] leading-[22px] border-solid border-black cursor-pointer"
            style={{
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
            }}
            onClick={handleAdd}>
            <button>Add question</button>
          </div>
          {data && data.length !== 0 ? (
            <TableComponent
              data={data}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ) : (
            <h1 className="text-xl my-10">No Data Found</h1>
          )}
        </div>
      </div>
      {props.isOpen && message !== "Success" && !isError && (
        <div className="bg-black bg-opacity-50 fixed inset-0 z-50 w-full h-full flex justify-center items-center px-4">
          <div>
            <div>
              <div className="container mx-auto">
                <div className="relative flex flex-col md:flex-row w-full md:man-h-[30rem] h-full md:max-w-[1100px] bg-white rounded-[30px] mx-auto shadow-lg">
                  <div className="relative w-full z-[1000]  md:max-w-[750px] md:py-8 py-4 md:px-8 px-4 text-[18px] leading-[30px] font-semibold overflow-hidden mx-auto flex  flex-col justify-center">
                    <FormOrganism
                      onSubmit={handleSubmit(onSubmit)}
                      register={register}
                      errors={errors}
                      isNewQuestion={isNewQuestion}
                      previousData={previousData}
                      onClick={props.CloseModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Questions;
