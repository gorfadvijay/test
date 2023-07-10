import moment from "moment";
import React from "react";

function TableComponent({ data, handleDelete, handleUpdate }) {
  console.log("datadatadatadatadatadata", data);
  return (
    <div>
      {" "}
      <section className="container mx-auto p-6 ">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold  text-left text-gray-900 bg-gray-100 capitalize  border ">
                  <th className="px-4 py-3">S.no</th>
                  <th className="px-4 py-3">Question</th>
                  <th className="px-4 py-3">Explanation</th>
                  <th className="px-4 py-3">Comments</th>
                  <th className="px-4 py-3">reviewer</th>

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
                      <td className="px-4 py-3 border ">{row.question}</td>
                      <td className="px-4 py-3 border ">
                        {row.questions_explanation}
                      </td>
                      <td className="px-4 py-3 border ">
                        {row.questions_comments}
                      </td>
                      <td className="px-4 py-3 border ">
                        {row.reviewername ? row.reviewername : "Not Found"}
                      </td>
                      <td className="px-4 py-3 border">
                        {moment(row.created_at).format("D MMMM YYYY, h:mm a")}
                      </td>
                      <td className="px-4 py-3 border">
                        {moment(row.updated_at).format("D MMMM YYYY, h:mm a")}
                      </td>

                      <td className="px-4 py-3 border ">
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
                      </td>
                      <td className="px-4 py-3 border ">
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
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TableComponent;
