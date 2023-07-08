import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment/moment";
import FormOrganism from "@/components/FormOrganism/Formorganism";

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
    },
  });

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
    setUpdateId(id);
    setValue("question", row.question);
    setValue("questions_comments", row.questions_comments);
    setValue("questions_explanation", row.questions_explanation);
    props.openModal();
  };

  const handleAdd = () => {
    setUpdateId(null);
    props.openModal();
  };

  const onSubmit = async (data) => {
    try {
      if (updateId) {
        const response = await axios.put(
          `http://localhost:4201/api/v1/question/${updateId}`,
          {
            question: data.question,
            questions_comments: data.questions_comments,
            questions_explanation: data.questions_explanation,
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
        };

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

  useEffect(() => {
    fetchData();
  }, []);
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
            <section className="container mx-auto p-6 ">
              <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-md font-semibold  text-left text-gray-900 bg-gray-100 uppercase  border ">
                        <th className="px-4 py-3">S.no</th>
                        <th className="px-4 py-3">Question</th>
                        <th className="px-4 py-3">Explanation</th>
                        <th className="px-4 py-3">Comments</th>
                        <th className="px-4 py-3">Created At</th>
                        <th className="px-4 py-3">Updated At</th>
                        <th className="px-4 py-3">Delete</th>
                        <th className="px-4 py-3">Update</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {data &&
                        data.map((row, index) => (
                          <tr className="text-gray-600" key={row.questions_id}>
                            <td className="px-4 py-3 border ">{index + 1}</td>
                            <td className="px-4 py-3 border ">
                              {row.question}
                            </td>
                            <td className="px-4 py-3 border ">
                              {row.questions_explanation}
                            </td>
                            <td className="px-4 py-3 border ">
                              {row.questions_comments}
                            </td>
                            <td className="px-4 py-3 border ">
                              {moment(row.created_at).format(
                                "D MMMM YYYY, HH:mm:ss"
                              )}
                            </td>
                            <td className="px-4 py-3 border ">
                              {moment(row.updated_at).format(
                                "D MMMM YYYY, HH:mm:ss"
                              )}
                            </td>

                            <td className="px-4 py-3 border ">
                              <button
                                onClick={() => handleDelete(row.questions_id)}
                                // className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                                style={{
                                  backgroundColor: "#F44336",
                                  borderRadius: "8px",
                                  padding: "8px 16px",
                                  color: "white",
                                }}>
                                Delete
                              </button>
                            </td>
                            <td className="px-4 py-3 border ">
                              <button
                                onClick={() =>
                                  handleUpdate(row.questions_id, row)
                                }
                                // className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                                style={{
                                  backgroundColor: "#3F51B5",
                                  borderRadius: "8px",
                                  padding: "8px 16px",
                                  color: "white",
                                }}>
                                Update
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          ) : (
            <h1 className="text-xl my-10">No Data Found</h1>
          )}
        </div>
      </div>
      {props.isOpen && (
        <div className="bg-black bg-opacity-50 fixed inset-0 z-50 w-full h-full flex justify-center items-center px-4">
          <div>
            <div>
              <div className="container mx-auto">
                <div className="relative flex flex-col md:flex-row w-full md:man-h-[30rem] h-full md:max-w-[1100px] bg-white rounded-[30px] mx-auto shadow-lg">
                  <div className="bg-[#D7E9FF] rounded-[30px] md:max-w-[450px] md:flex flex-col items-start justify-start py-12 px-12 bg-no-repeat bg-cover bg-center hidden relative">
                    <div className="mt-3">
                      {" "}
                      <div className="flex mx-auto justify-center absolute left-[40%]">
                        <div className="bg-[#3AFF58] h-[100px] w-[100px]  rounded-full blur-[70px] "></div>
                      </div>
                      <img
                        src="./assets/images/FormIcon.svg"
                        className="h-[150px] w-auto my-3"
                      />
                      <div className="flex justify-between ">
                        <h1 className="text-primary text-[55px] font-extrabold leading-[55px] mt-2">
                          Let’s Get Started
                        </h1>
                        <div className="bg-[#612ADB] h-[150px] w-[150px] mix-blend  rounded-l-full blur-[60px]  right-[5rem] overflow-hidden absolute bg-opacity-50"></div>
                      </div>
                      <div className="flex">
                        <p className="text-primary text-[18px] leading-[30px] font-semibold mt-3">
                          Please fill the form with your requirement.!
                        </p>
                        <div className="flex mx-auto justify-end absolute left-[55%] ">
                          <div className="bg-[#3AFF58] h-[100px] w-[100px] top-[10%]  rounded-full blur-[70px] "></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {message !== "Success" && !isError && (
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
                  )}
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
