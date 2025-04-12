import { useEffect, useState } from "react"
import { Row, Col, Card, Button, Form, Table, Nav, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaDownload, FaFilter, FaPlus, FaSearch, FaEye } from "react-icons/fa"
import { StudentSideBar } from "../../components/StudentProfileComponent/StudentSideBar"

// Updated sample data for co-curricular activities with all fields
// const activities = [
//   {
//     id: 1,
//     department: "CSE",
//     year: "2022-2023",
//     student: "Alex Johnson",
//     rollNo: "CSE2001",
//     level: "National",
//     event: "Tech Hackathon 2023",
//     type: "Co-curricular",
//     mode: "External",
//     category: "Technical",
//     place: "First",
//     date: "2023-03-15",
//     organizer: "Tech University",
//     club: "Coding Club",
//     teamInd: "Team",
//     description: "Participated in a 48-hour hackathon and developed a solution for sustainable energy tracking.",
//   },
// ]

export const StudentProfileViewParcipated = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "all",
    year: "all",
    level: "all",
    type: "all",
    category: "all",
    place: "all",
  });
  const [activeTab, setActiveTab] = useState("table");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch("https://test.mcetit.drmcetit.com/api/profile/activities/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        const safeData = Array.isArray(data)
          ? data
          : data.activities && Array.isArray(data.activities)
          ? data.activities
          : [];
        setActivities(safeData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setActivities([]); // Prevent crash if fetch fails
      });
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Filter activities based on search term and filters
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filters.department === "all" || activity.department === filters.department;
    const matchesYear = filters.year === "all" || activity.year === filters.year;
    const matchesLevel = filters.level === "all" || activity.level === filters.level;
    const matchesType = filters.type === "all" || activity.type === filters.type;
    const matchesCategory =
      filters.category === "all" || activity.category === filters.category;
    const matchesPlace = filters.place === "all" || activity.place === filters.place;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesYear &&
      matchesLevel &&
      matchesType &&
      matchesCategory &&
      matchesPlace
    );
  });

  const getBadgeVariant = (place) => {
    switch (place) {
      case "Award":
        return "badge-approved";
      case "Participated":
        return "badge-pending";
      default:
        return "badge-pending";
    }
  };

  // View details of an activity
  const viewActivityDetails = (activity) => {
    setSelectedActivity(activity);
    setShowDetailModal(true);
  };



  return (
    <div className="d-flex">
      <StudentSideBar/>
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="bg-white" style={{
          backgroundColor:"ffffff",
          position:"sticky",
          top:"0",
          zIndex:"9"
        }}>
            <h1 className="h3 fw-bold">Your Activities</h1>
            <p className="text-muted">View and manage your submitted your activities</p>
          </div>
          <Link to="/student-profile/activity/form">
            <Button variant="primary">
              <FaPlus className="me-2" /> Add Activity
            </Button>
          </Link>
        </div>

        <Card>
          <Card.Header className="bg-white">
            <Card.Title className="h5 mb-0">Activity Submissions</Card.Title>
            <Card.Subtitle className="text-muted small mt-1">
              Browse through all your submitted your activities
            </Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <div className="mb-4">

              <div className="d-flex flex-column flex-md-row gap-3 justify-content-between mb-3">
                <div className="position-relative">
                  <FaSearch className="position-absolute" style={{ top: "11px", left: "05px", opacity: 0.5 }} />
                  <Form.Control
                    type="search"
                    placeholder="Search activities..."
                    className="ps-4"
                    style={{ width: "300px" }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-wrap gap-2 align-items-center">
                  <FaFilter className="text-muted" />

                  <Form.Select
                    style={{ width: "130px" }}
                    name="year"
                    value={filters.year}
                    onChange={handleFilterChange}
                  >
                    <option value="all">All Years</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2022-2023">2022-2023</option>
                    <option value="2021-2022">2021-2022</option>
                  </Form.Select>

                  <Form.Select
                    style={{ width: "130px" }}
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <option value="all">All Types</option>
                    <option value="Co-curricular">Co-curricular</option>
                    <option value="Extra-curricular">Extra-curricular</option>
                  </Form.Select>

                  
                </div>
              </div>
            </div>

            
            {activeTab === "table" ? (
              <div className="table-responsive" style={{ width:"75vw", overflowX: "scroll" }}>
                <Table hover className="align-middle">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Department</th>
                      <th>Event</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>place</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActivities.length > 0 ? (
                      filteredActivities.map((activity) => (
                        <tr key={activity.id}>
                          <td>
                            <div>
                              <div className="fw-medium">{activity.student}</div>
                              <small className="text-muted">{activity.rollNo}</small>
                            </div>
                          </td>
                          <td>{activity.department}</td>
                          <td>
                            <div>
                              <div className="fw-medium">{activity.event}</div>
                              <small className="text-muted">{activity.level}</small>
                            </div>
                          </td>
                          <td>{activity.category}</td>
                          <td>{new Date(activity.date).toLocaleDateString()}</td>
                          <td>
                            <div className={getBadgeVariant(activity.place)}>{activity.place}</div>
                          </td>
                          <td className="text-end">
                            <Button
                              variant="link"
                              size="sm"
                              className="text-decoration-none me-2"
                              onClick={() => viewActivityDetails(activity)}
                            >
                              <FaEye className="me-1" /> View
                            </Button>
                            
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-4">
                          No activities found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            ) : (
              <Row xs={1} md={2} lg={3} className="g-4">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <Col key={activity.id}>
                      <Card>
                        <Card.Header className="bg-white">
                          <div className="d-flex justify-content-between align-items-center">
                            <Card.Title className="h6 mb-0">{activity.event}</Card.Title>
                            <div className={getBadgeVariant(activity.place)}>{activity.place}</div>
                          </div>
                          <Card.Subtitle className="text-muted small mt-1">
                            {activity.department} • {activity.category} • {new Date(activity.date).toLocaleDateString()}
                          </Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                          <div className="mb-2">
                            <strong className="small">Student:</strong> {activity.student} ({activity.rollNo})
                          </div>
                          <div className="mb-2">
                            <strong className="small">Level:</strong> {activity.level} |{" "}
                            <strong className="small">Type:</strong> {activity.teamInd}
                          </div>
                          <Card.Text
                            className="small text-muted mb-0"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {activity.description}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer className="bg-white text-end border-top">
                          <Button
                            variant="link"
                            size="sm"
                            className="text-decoration-none p-0 me-3"
                            onClick={() => viewActivityDetails(activity)}
                          >
                            <FaEye className="me-1" /> View
                          </Button>
                          
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col xs={12} className="text-center py-4">
                    <p className="text-muted">No activities found.</p>
                  </Col>
                )}
              </Row>
            )}
          </Card.Body>
        </Card>

        {/* Activity Detail Modal */}
        {selectedActivity && (
          <div
            className={`modal ${showDetailModal ? "show d-block" : ""}`}
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedActivity.event}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
                </div>
                <div className="modal-body">
                  <Row className="mb-4">
                    <Col md={6}>
                      <h6>Student Information</h6>
                      <table className="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td className="fw-medium">Name:</td>
                            <td>{selectedActivity.student}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Roll No:</td>
                            <td>{selectedActivity.rollNo}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Department:</td>
                            <td>{selectedActivity.department}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Academic Year:</td>
                            <td>{selectedActivity.year}</td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                    <Col md={6}>
                      <h6>Event Information</h6>
                      <table className="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td className="fw-medium">Event:</td>
                            <td>{selectedActivity.event}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Date:</td>
                            <td>{new Date(selectedActivity.date).toLocaleDateString()}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Category:</td>
                            <td>{selectedActivity.category}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Level:</td>
                            <td>{selectedActivity.level}</td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={6}>
                      <h6>Participation Details</h6>
                      <table className="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td className="fw-medium">Type:</td>
                            <td>{selectedActivity.type}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Mode:</td>
                            <td>{selectedActivity.mode}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Participation:</td>
                            <td>{selectedActivity.teamInd}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">place:</td>
                            <td>
                              <div className={getBadgeVariant(selectedActivity.place)}>
                                {selectedActivity.place}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                    <Col md={6}>
                      <h6>Organizer Information</h6>
                      <table className="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td className="fw-medium">Organizer:</td>
                            <td>{selectedActivity.organizer}</td>
                          </tr>
                          {selectedActivity.club && (
                            <tr>
                              <td className="fw-medium">Club/Cell:</td>
                              <td>{selectedActivity.club}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </Col>
                  </Row>

                  <div className="mb-3">
                    <h6>Description</h6>
                    <p>{selectedActivity.description}</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <Button variant="outline-secondary" onClick={() => setShowDetailModal(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
