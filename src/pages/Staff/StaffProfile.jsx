import { useState, useEffect } from "react"
import { Form, InputGroup, Button, ListGroup, Badge } from "react-bootstrap"
import { FaSearch, FaEye, FaUserGraduate } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { StaffSideBar } from "../../components/StudentProfileComponent/StaffSideBar"

// Sample student data
// const studentsData = [
//   { id: 1, name: "Alex Johnson", RollNum: "CSE2001", department: "CSE", year: "3rd" },
//   { id: 2, name: "Priya Sharma", RollNum: "ECE2045", department: "ECE", year: "2nd" },
//   { id: 3, name: "Marcus Lee", RollNum: "CSE2022", department: "CSE", year: "3rd" },
//   { id: 4, name: "Sophia Chen", RollNum: "MECH2015", department: "MECH", year: "4th" },
//   { id: 5, name: "Jordan Taylor", RollNum: "CIVIL2033", department: "CIVIL", year: "2nd" },
//   { id: 6, name: "Aisha Patel", RollNum: "IT2019", department: "IT", year: "3rd" },
//   { id: 7, name: "Carlos Rodriguez", RollNum: "CSE2005", department: "CSE", year: "4th" },
//   { id: 8, name: "Emma Wilson", RollNum: "ECE2050", department: "ECE", year: "2nd" },
//   { id: 9, name: "David Kim", RollNum: "MECH2020", department: "MECH", year: "3rd" },
//   { id: 10, name: "Olivia Brown", RollNum: "IT2025", department: "IT", year: "2nd" },
//   { id: 11, name: "Raj Patel", RollNum: "CSE2030", department: "CSE", year: "3rd" },
//   { id: 12, name: "Zoe Martinez", RollNum: "CIVIL2040", department: "CIVIL", year: "4th" },
//   { id: 13, name: "Tyler Johnson", RollNum: "ECE2060", department: "ECE", year: "3rd" },
//   { id: 14, name: "Mia Wong", RollNum: "CSE2015", department: "CSE", year: "4th" },
//   { id: 15, name: "Noah Garcia", RollNum: "IT2035", department: "IT", year: "2nd" },
// ]

export const StaffProfile = ({ onSelectStudent }) => {
  // const navigate = useNavigate()
  // const [searchTerm, setSearchTerm] = useState("")
  // const [studentsData, setStudentsData] = useState([]);
  // const [filteredStudents, setFilteredStudents] = useState(studentsData)

  // // Filter students based on search term
  // useEffect(() => {
  //   const results = studentsData.filter(
  //     (student) =>
  //       student.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       student.RollNum.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   setFilteredStudents(results)
  // }, [searchTerm])

  // const handleViewStudent = (student) => {
  //   console.log("Viewing student:", student)
  //   navigate(`/student/${student.id}`)

  //   // Also notify parent component
  //   if (onSelectStudent) {
  //     onSelectStudent(student)
  //   }
  // }

  // useEffect(() => {
  //   fetch("https://test.mcetit.drmcetit.com/api/teacher/studentList/", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("access_token_staff")}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("API Response:", data);
  //       const safeData = Array.isArray(data)
  //         ? data
  //         : data.studentsData && Array.isArray(data.studentsData)
  //         ? data.studentsData
  //         : [];
  //         console.log(safeData)
  //       setStudentsData(safeData);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setStudentsData([]); // Prevent crash if fetch fails
  //     });
  // }, []);
  const navigate = useNavigate();
const [searchTerm, setSearchTerm] = useState("");
const [studentsData, setStudentsData] = useState([]);
const [filteredStudents, setFilteredStudents] = useState(studentsData);

// Filter students based on search term
useEffect(() => {
  const results = studentsData.filter(
    (student) =>
      student.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.RollNum.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredStudents(results);
}, [searchTerm, studentsData]); // Added studentsData dependency

const handleViewStudent = (student) => {
  console.log("Viewing student:", student);
  navigate(`/student/${student.User}`);

  // Also notify parent component
  if (onSelectStudent) {
    onSelectStudent(student);
  }
};

useEffect(() => {
  fetch("https://test.mcetit.drmcetit.com/api/teacher/studentList/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token_staff")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("API Response:", data);
      const safeData = Array.isArray(data)
        ? data
        : data.studentsData && Array.isArray(data.studentsData)
        ? data.studentsData
        : [];
      console.log(safeData);
      setStudentsData(safeData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setStudentsData([]); // Corrected function name
    });
}, []);
  return (
    <div className="d-flex">
      <StaffSideBar/>
      <div className="flex-grow-1 p-4">
        <div className="student-sidebar p-3">
          <div className="d-flex align-items-center mb-4">
            <FaUserGraduate className="text-primary me-2" size={20} />
            <h4 className="mb-0">Students</h4>
          </div>

          {/* Search Input */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="search-addon" className="bg-white">
              <FaSearch className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search students..."
              aria-label="Search students"
              aria-describedby="search-addon"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          {/* Student List */}
          <div className="student-list">
            <ListGroup>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <ListGroup.Item key={student.id} className="border-0 border-bottom rounded-0 py-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{student.Name}</h6>
                        <div className="d-flex align-items-center">
                          <small className="text-muted me-2">{student.RollNum}</small>
                        </div>
                      </div>
                      <Button variant="outline-primary" size="sm" onClick={() => handleViewStudent(student)}>
                        <FaEye className="me-1" /> View
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <div className="text-center py-4 text-muted">No students found</div>
              )}
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  )
}
