import React from "react"
import editIcon from "./editIcon.svg"
import deleteIcon from "./deleteIcon.svg"

function tableRow() {
    return (
        <tr id="tableRow">
            <td className="px-4">1</td>
            <td>Robert Fox</td>
            <td>8th</td>
            <td>passed</td>
            <td>78/100</td>
            <td>Poor</td>
            <td id="actionButtons">
                <img id="editIcon" className="mx-2" data-bs-toggle="modal" data-bs-target="#addStudent" src={editIcon} />
                <img id="deleteIcon" className="mx-2" data-bs-toggle="modal" data-bs-target="#deleteStudent" src={deleteIcon} />
            </td>
        </tr>
    )
}

export default tableRow;