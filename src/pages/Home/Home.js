import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import BootstrapTable from "react-bootstrap-table-next";
import BootstrapTable from "react-bootstrap-table-next";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment/moment";
import FormOrganism from "@/components/FormOrganism/Formorganism";

function Home(props) {
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
  // get all question
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/question");
      setData(response.data);
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

  // Set the ID of the question being updated
  const handleUpdate = (id, row) => {
    setUpdateId(id);
    setValue("question", row.question);
    setValue("questions_comments", row.questions_comments);
    setValue("questions_explanation", row.questions_explanation);
    props.openModal();
  };

  // Reset the updateId when adding a new question
  const handleAdd = () => {
    setUpdateId(null);
    props.openModal();
  };

  const onSubmit = async (data) => {
    try {
      if (updateId) {
        const response = await axios.put(
          `http://localhost:3000/api/v1/question/${updateId}`,
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
          "http://localhost:3000/api/v1/question",
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
        `http://localhost:3000/api/v1/question/${id}`
      );
      toast.success("Question deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const column = [
    {
      dataField: "",
      text: "S.no",
      formatter: (cell, row, rowIndex) => rowIndex + 1,
    },

    {
      dataField: "question",
      text: "question",
      formatter: (cell, row) => (
        <div
          className="custom-column-width"
          style={{ width: "100px", height: "auto" }}>
          <div style={{ wordWrap: "break-word" }}>{row.question}</div>
        </div>
      ),
    },

    {
      dataField: "questions_explanation",
      text: "questions_explanation",
      formatter: (cell, row) => (
        <div
          className="custom-column-width"
          style={{ width: "100px", height: "auto" }}>
          <div style={{ wordWrap: "break-word" }}>
            {row.questions_explanation}
          </div>
        </div>
      ),
    },

    {
      dataField: "questions_comments",
      text: "questions_comments",
      formatter: (cell, row) => (
        <div
          className="custom-column-width"
          style={{ width: "100px", height: "auto" }}>
          <div style={{ wordWrap: "break-word" }}>{row.questions_comments}</div>
        </div>
      ),
    },

    {
      dataField: "created_at",
      text: "created_at",
      formatter: (time, row) => {
        return (
          <div className="flex justify-center align-center text-center">
            {moment(row.created_at).format("MMM Do YY, HH:mm:ss")}
          </div>
        );
      },
    },

    {
      dataField: "updated_at",
      text: "updated_at",
      formatter: (time, row) => {
        return (
          <div className="flex justify-center align-center text-center">
            {moment(row.updated_at).format("MMM Do YY, HH:mm:ss")}
          </div>
        );
      },
    },

    {
      text: "Delete",
      formatter: (cell, row) => (
        <button
          onClick={() => handleDelete(row.questions_id)}
          style={{
            backgroundColor: "#F44336",
            borderRadius: "8px",
            padding: "8px 16px",
            color: "white",
          }}>
          Delete
        </button>
      ),
    },

    {
      text: "Update",
      formatter: (cell, row) => (
        <button
          onClick={() => handleUpdate(row.questions_id, row)}
          style={{
            backgroundColor: "#3F51B5",
            borderRadius: "8px",
            padding: "8px 16px",
            color: "white",
          }}>
          Update
        </button>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const rowStyle = () => {
    const style = {
      backgroundColor: "white",
      color: "black",
      boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.08)",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      border: "10px solid white",
      borderRadius: "20px",
      fontSize: "14px",
    };
    return style;
  };
  return (
    <>
      <ToastContainer />
      <div
        className="justify-center mt-12 w-full md:px-10 px-5  mx-auto items-center flex md:flex-row flex-col"
        id="">
        <div className="text-base mx-auto flex flex-col justify-center items-center font-medium leading-4 text-black my-4">
          <div
            className=" text-center border-[1px] bg-[rgba(0, 0, 0, 0.05)] py-[15px] px-[30px] rounded-[15px] font-medium button text-[18px] leading-[22px] border-solid border-black cursor-pointer"
            style={{
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
            }}
            onClick={handleAdd}>
            <button>Add question</button>
          </div>
          <div className="relative md:my-20 " id="WhoWeAre">
            <div className="w-full md:px-10 px-5 md:max-w-[1400px] mx-auto items-start flex md:flex-row flex-col">
              <div style={{ padding: "25px auto" }}>
                {data.length === 0 ? (
                  <h1>No data found</h1>
                ) : (
                  <div className="userdatatable items-center justify-center text-center ">
                    <BootstrapTable
                      bootstrap4
                      keyField="id"
                      data={data}
                      columns={column}
                      rowStyle={rowStyle}
                      headerClasses="header-class"
                      bordered={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
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

export default Home;
