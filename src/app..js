import React, { useState } from "react";
import logo from "./logo.PNG"
import dashborad from "./dashboard.png"
import students from "./students.png"
import courses from "./courses.png"
import exams from "./exams.png"
import results from "./results.png"
import noticeBoard from "./notice-board.png"
import live from "./live.png"
import bell from "./bell.png"
import avtar from "./avtar.svg"
import editIcon from "./editIcon.svg"
import deleteIcon from "./deleteIcon.svg"
import TableRow from "./tableRow"



function App() {
    let dummyData = [
        {
            number: 1,
            studentName: "Saurabh",
            classValue: "8th",
            score: 59,
            result: "Passed",
            grade: "Average",
        },
        {
            number: 2,
            studentName: "Satvik",
            classValue: "10th",
            score: 90,
            result: "Passed",
            grade: "Excellent",
        },
        {
            number: 3,
            studentName: "Ashish",
            classValue: "11th",
            score: 20,
            result: "Failed",
            grade: "Poor",
        }
    ]
    let [studentName, setStudentName] = useState("");
    let [classValue, setClassValue] = useState();
    let [score, setScore] = useState();
    let [result, setResult] = useState();
    let [grade, setGrade] = useState();
    let [isError, setIsError] = useState()
    let [tableBody, setTableBody] = useState(dummyData);
    let [currentlyEditing, setCurrentlyEditing] = useState();
    let [currentlyDeleting, setCurrentlyDeleting] = useState();




    function nameChangeHandler(e) {
        setStudentName(e.target.value)
        let inp1 = e.target
        let nameError = e.target.nextSibling;
        if (e.target.value == "") {
            inp1.style.borderColor = "red"
            nameError.className = "d-block text-danger"
            setIsError(true)
        } else {
            inp1.style.borderColor = "#ced4da"
            nameError.className = "d-none text-danger"
            setIsError(false)
        }
    }

    function classChangeHandler(e) {
        setClassValue(e.target.value)
        let inp2 = e.target;
        let classError = inp2.nextSibling;

        if (e.target.value > 12 || e.target.value < 1 || e.target.value == "") {
            inp2.style.borderColor = "red"
            classError.className = "d-block text-danger"
            setIsError(false)
        } else {
            inp2.style.borderColor = "#ced4da"
            classError.className = "d-none text-danger"
            setIsError(true)
        }
    }

    function scoreChangeHandler(e) {
        setScore(e.target.value)
        let inp3 = e.target
        let scoreError = inp3.nextSibling;
        let studentResult = inp3.parentElement.nextSibling.nextSibling;
        let studentGrade = studentResult.nextSibling.nextSibling.nextSibling.nextSibling;
        let value = e.target.value;


        if (value > 100 || value < 0 || value == "" || isNaN(value)) {
            inp3.style.borderColor = "red"
            scoreError.className = "d-block text-danger"
            setIsError(false)
        } else {
            inp3.style.borderColor = "#ced4da"
            scoreError.className = "d-none text-danger"
            setIsError(true)
        }


        if (value >= 76 && value <= 100) {
            setResult("Passed")
            setGrade("Excellent")
            studentResult.innerText = "Passed"
            studentGrade.innerText = "Excellent"
            studentGrade.style.color = "#2CBF6E"
            studentResult.style.background = "#2CBF6E"
            studentResult.style.color = "white"
        }
        if (value >= 31 && value <= 75) {
            setResult("Passed")
            setGrade("Average")
            studentResult.innerText = "Passed"
            studentGrade.innerText = "Average"
            studentGrade.style.color = "#2CBF6E"
            studentResult.style.background = "#2CBF6E"
            studentResult.style.color = "white"
        }
        if (value >= 0 && value <= 30) {
            setResult("Failed")
            setGrade("Poor")
            studentResult.innerText = "Failed"
            studentGrade.innerText = "Poor"
            studentGrade.style.color = "#F24643"
            studentResult.style.background = "#F24643"
            studentResult.style.color = "white"
        }
        if (value == "" || (value < 0 || value > 100)) {
            setResult("-")
            setGrade("-")
            studentResult.innerHTML = "-"
            studentGrade.innerText = "-"
            studentGrade.style.color = "black"
            studentResult.style.background = "transparent"
            studentResult.style.color = "black"
        }
    }

    function handleAddStudentSubmit(e) {
        e.preventDefault();
        let data = {
            "number": tableBody.length + 1,
            studentName,
            classValue: classValue + "th",
            score,
            result,
            grade
        }

        if (isError) {
            setTableBody([...tableBody, data])
        }
    }

    function handleEditStudentSubmit(e) {
        e.preventDefault()
        let data = {
            "number": currentlyEditing + 1,
            studentName,
            classValue: classValue + "th",
            score,
            result,
            grade
        }
        if (isError) {
            let updated = tableBody;
            updated[currentlyEditing] = data
            setTableBody([...updated])
        }
    }


    function deletingIconClick(n) {
        let deletingName = document.getElementById("deletingName");
        let deletingClass = document.getElementById("deletingClass")
        deletingClass.innerText = tableBody[n].classValue
        deletingName.innerText = tableBody[n].studentName
    }

    function handleDeleteConfirm() {
        let updated = [...tableBody];
        updated.splice(currentlyDeleting, 1)
        setTableBody(updated)
    }



    return (
        <>

            {/** Add student modal */}
            <div className="modal fade" id="addStudent" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold fs-5" id="exampleModalLabel">Add Student</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Student Name*</label>
                                    <input type="text" minLength={1} name="studentName" onChange={nameChangeHandler} className="form-control" id="inp1" />
                                    <p id="nameError" className="d-none text-danger"><i><small>Error: Name field cannot be left blank.</small></i></p>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Class*</label>
                                    <input type="text" required={true} name="classValue" onChange={classChangeHandler} className="form-control" id="inp2" />
                                    <p id="classError" className="d-none text-danger"><i><small>Error: Please enter value between 1 & 12</small></i></p>
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Score*</label>
                                    <input type="text" min={0} max={100} name="score" onChange={scoreChangeHandler} className="form-control" id="inp3" />
                                    <p id="scoreError" className="d-none text-danger"><i><small>Error: Please enter value between 0 & 100</small></i></p>
                                </div>

                                <p style={{ fontSize: "12px", color: "#7F878A" }}><b>RESULT</b></p>
                                <p id="studentResult" style={{ padding: "2px 8px", fontSize: "14px", display: "inline", borderRadius: "10px" }}>
                                    -
                                </p>
                                <br /><br />
                                <p style={{ fontSize: "12px", color: "#7F878A" }}><b>GRADE</b></p>
                                <p id="studentGrade" className="fw-bold" style={{ fontSize: "14px" }}>
                                    -
                                </p>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="cancleButton" data-bs-dismiss="modal">Cancle</button>
                            <button type="submit" id="submitButton" onClick={handleAddStudentSubmit} data-bs-dismiss={isError == true ? "modal" : ""}>CONFIRM</button>
                        </div>
                    </div>
                </div>
            </div>



            {/** Edit student modal */}
            <div className="modal fade" id="editStudent" tabIndex="0" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold fs-5" id="exampleModalLabel2">Edit Student</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Student Name*</label>
                                    <input type="text" minLength={1} name="studentName" onChange={nameChangeHandler} className="form-control" id="inp11" />
                                    <p id="nameError" className="d-none text-danger"><i><small>Error: Name field cannot be left blank.</small></i></p>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Class*</label>
                                    <input type="text" required={true} name="classValue" onChange={classChangeHandler} className="form-control" id="inp2" />
                                    <p id="classError" className="d-none text-danger"><i><small>Error: Please enter value between 1 & 12</small></i></p>
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Score*</label>
                                    <input type="text" min={0} max={100} name="score" onChange={scoreChangeHandler} className="form-control" id="inp3" />
                                    <p id="scoreError" className="d-none text-danger"><i><small>Error: Please enter value between 0 & 100</small></i></p>
                                </div>

                                <p style={{ fontSize: "12px", color: "#7F878A" }}><b>RESULT</b></p>
                                <p id="studentResult" style={{ padding: "2px 8px", fontSize: "14px", display: "inline", borderRadius: "10px" }}>
                                    -
                                </p>
                                <br /><br />
                                <p style={{ fontSize: "12px", color: "#7F878A" }}><b>GRADE</b></p>
                                <p id="studentGrade" className="fw-bold" style={{ fontSize: "14px" }}>
                                    -
                                </p>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="cancleButton" data-bs-dismiss="modal">Cancle</button>
                            <button type="submit" id="submitButton" onClick={handleEditStudentSubmit} data-bs-dismiss={isError == true ? "modal" : ""}>CONFIRM</button>
                        </div>
                    </div>
                </div>
            </div>




            {/** Delete Student */}
            <div className="modal fade" id="deleteStudent" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold fs-5" id="exampleModalLabel">Remove Student</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body pb-5">

                            <p style={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>Are you sure want to remove the current student from the list ? </p>
                            <p style={{ fontSize: "12px", color: "#7F878A", marginTop: "30px" }}>STUDENT NAME</p>
                            <p id="deletingName" style={{ fontSize: "14px", color: "black", marginTop: "-14px" }}></p>
                            <p style={{ fontSize: "12px", color: "#7F878A", marginTop: "30px" }}>CLASS</p>
                            <p id="deletingClass" style={{ fontSize: "14px", color: "black", marginTop: "-14px" }}>{currentlyDeleting}</p>


                        </div>
                        <div className="modal-footer">
                            <button type="button" id="cancleButton" data-bs-dismiss="modal">Cancle</button>
                            <button type="button" id="submitButton" onClick={handleDeleteConfirm}  data-bs-dismiss="modal"  style={{ backgroundColor: "#F24643" }}>REMOVE</button>
                        </div>
                    </div>
                </div>
            </div>





            <div className="container-fluid">
                <div className="row">

                    <div id="sidebar" className="col-md-3" >
                        <div className="mx-3" style={{ height: "100vh" }}>
                            {/** Logo */}
                            <div className="py-4" >
                                <img src={logo} className="img-fluid" />
                            </div>
                            {/** Horizontal Line */}
                            <div className="border"></div>
                            {/* Links */}
                            <div className="mt-3">
                                <div className="my-1 py-2 px-3">
                                    <img src={dashborad} style={{ height: "20px", width: "20px" }} />
                                    <p id="sidebar-items-text" className="d-inline px-3">Dashborad</p>
                                </div>
                                <div className=" my-1 py-2 px-3">
                                    <img src={courses} style={{ height: "20px", width: "20px" }} />
                                    <p id="sidebar-items-text" className="d-inline px-3">Courses</p>
                                </div>
                                <div className=" my-1 py-2 px-3" style={{ height: "40px", background: "#eaf6fb", borderRadius: "10px" }}>
                                    <img src={students} style={{ height: "20px", width: "20px" }} />
                                    <p id="sidebar-items-text" style={{ color: "#2ca4d8", fontWeight: "600", opacity: "unset" }} className="d-inline px-3">Students</p>
                                </div>
                                <div className=" my-1 py-2 px-3">
                                    <img src={exams} style={{ height: "20px", width: "20px" }} />
                                    <p id="sidebar-items-text" className="d-inline px-3">Exams</p>
                                </div>
                                <div className=" my-1 py-2 px-3">
                                    <img src={results} style={{ height: "20px", width: "20px" }} />
                                    <p id="sidebar-items-text" className="d-inline px-3">Results</p>
                                </div>
                                <div className=" my-1 py-2 px-3">
                                    <img src={noticeBoard} style={{ height: "20px", width: "20px" }} />
                                    <p id="sidebar-items-text" className="d-inline px-3">Notice Board</p>
                                </div>
                                <div className=" my-1 py-2 px-3">
                                    <img src={live} style={{ height: "20px", width: "20px" }} />
                                    <p id="sidebar-items-text" className="d-inline px-3">Live Classes</p>
                                </div>
                                <div className=" my-1 py-2 px-3">
                                    <img src={bell} style={{ height: "20px", width: "20px" }} />
                                    <p id="sidebar-items-text" className="d-inline px-3">Notification</p>
                                </div>
                            </div>

                            <div className="" style={{ height: "150px", position: "absolute", bottom: "10px" }}>
                                <img src={avtar} />
                                <p style={{
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    lineHeight: "32px",
                                    color: "#242424;"
                                }}>Andy Samberg</p>
                                <p style={{
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    fontSize: "12px",
                                    marginTop: "-19px",
                                    color: "#7F878A;"
                                }}>andy.samberg@gmail.com</p>
                                <button id="view-profile-button">VIEW PROFILE</button>
                            </div>
                        </div>
                    </div >



                    <div className="col-md-9 " >
                        <div className="p-2" style={{ height: "100vh", background: "#F9FCFE" }}>
                            <div className="d-flex justify-content-between mt-4">
                                <p style={{ fontWeight: "600", fontSize: "28px" }}>Students</p>
                                <button id="addButton" data-bs-toggle="modal" data-bs-target="#addStudent" ><span className="fs-3">+</span> Add</button>
                            </div>
                            <div className="mt-2 border bg-white" style={{ height: "80%", overflow: "hidden", borderRadius: "10px" }}>
                                <table className="w-100" style={{ fontSize: "14px", lineHeight: "3" }}>

                                    <thead className="rounded-lg w-100" style={{ background: "#E5E5E5", }}>
                                        <tr className="rounded-lg ">
                                            <th className="px-3">No.</th>
                                            <th>Student Name</th>
                                            <th>Class</th>
                                            <th>Result</th>
                                            <th>Score</th>
                                            <th>Grade</th>
                                            <th style={{ color: "transparent" }}>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody id="tableBody">


                                        {
                                            tableBody.map((k, n) =>
                                                <tr id="tableRow" className="border-bottom">
                                                    <td className="px-4">{n + 1}</td>
                                                    <td>{k.studentName}</td>
                                                    <td>{k.classValue}</td>
                                                    <td id={k.result == "Passed" ? "passed" : "failed"}>{k.result}</td>
                                                    <td>{k.score}/ 100</td>
                                                    <td id={k.grade == "Poor" ? "poor" : "average"}>{k.grade}</td>
                                                    <td id="actionButtons">
                                                        <img id="editIcon" className={"mx-2"} onClick={() => setCurrentlyEditing(n)} data-bs-toggle="modal" data-bs-target="#editStudent" src={editIcon} />
                                                        <img id="deleteIcon" className="mx-2" onClick={() => {setCurrentlyDeleting(n); deletingIconClick(n)}} data-bs-toggle="modal" data-bs-target="#deleteStudent" src={deleteIcon} />
                                                    </td>
                                                </tr>
                                            )
                                        }

                                    </tbody>

                                </table>
                            </div>

                            <p style={{ fontSize: "12px", marginTop: "10px" }}>Showing {tableBody.length} of {tableBody.length} items</p>
                        </div>
                    </div>

                </div>
            </div>










        </>

    )
}

export default App;