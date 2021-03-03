import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

const StudentList = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [studentSelected, setStudentSelected] = useState();
  const [message, setMessage] = useState("");

  //   console.log(studentSelected);

  const messageToSave = async (_id, message) => {
    console.log(_id, message);
    try {
      const response = await axios.post(
        "http://localhost:3000/update-certificate",
        { _id, message }
      );
      console.log(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/list-student");

      setData(response.data.student);
      setIsLoading(false);
    } catch (error) {
      alert("An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <Loader type="Bars" color="#00BFFF" height={80} width={80} />
    </div>
  ) : (
    data.length > 0 && (
      <div
        style={{
          height: 700,
        }}
      >
        <form
          style={{
            marginTop: 20,
            width: 800,
            height: 400,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              //   border: "solid blue",
              display: "flex",
              justifyContent: "center",
              height: 50,
            }}
          >
            <select
              onChange={(event) => {
                setStudentSelected(event.target.value);
              }}
            >
              <option>Sélectionnez un utilisateur</option>
              {data.map((student, index) => {
                return (
                  <option key={student._id} value={index}>
                    {student.lastname} {student.firstname}
                  </option>
                );
              })}
            </select>
          </div>
          <div
            style={{
              //   border: "solid green",
              display: "flex",
              justifyContent: "center",
              height: 50,
            }}
          >
            {/* <p>Convention : </p> */}
            <input
              style={{ width: 200 }}
              type="text"
              value={
                studentSelected &&
                studentSelected !== "Sélectionnez un utilisateur"
                  ? data[studentSelected].convenant.name
                  : studentSelected === "Sélectionnez un utilisateur"
                  ? ""
                  : ""
              }
              onChange={(event) => {
                event.preventDefault();
              }}
            />
          </div>
          <div
            style={{
              //   border: "solid gold",
              display: "flex",
              justifyContent: "center",
              //   height: 50,
            }}
          >
            {/* <p>Message : </p> */}
            <textarea
              cols={40}
              rows={8}
              placeholder={
                studentSelected &&
                studentSelected !== "Sélectionnez un utilisateur"
                  ? data[studentSelected].certificate.message
                  : studentSelected === "Sélectionnez un utilisateur"
                  ? ""
                  : ""
              }
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
          <div
            style={{
              //   border: "solid pink",
              display: "flex",
              justifyContent: "center",
              height: 50,
            }}
          >
            <button
              onClick={() =>
                messageToSave(data[studentSelected].certificate._id, message)
              }
            >
              Save Message
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default StudentList;
