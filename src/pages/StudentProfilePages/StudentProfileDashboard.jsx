import { Row, Col, Card, Spinner } from "react-bootstrap"
import { FaAward, FaBook } from "react-icons/fa"
import { StudentSideBar } from "../../components/StudentProfileComponent/StudentSideBar"
import { useEffect, useState } from "react"
import axios from "axios"

export const StudentProfileDashboard = () => {

  const [activities, setActivities] = useState([]);
  const [totalActivities, setTotalActivities] = useState("0");
  const [cgpa, setCGPA] = useState("0");
  const [participationBadge, setparticipationBadge] = useState("0");
  const [WinnerCount, setWinnerCount] = useState("0");
  const [particpataionBadgeImg, setparticpataionBadgeImg] = useState("")
  const [winnerBadge, setwinnerBadge] = useState("")
  const [loading, setLoading] = useState(true); // 👈 Loading state added

  const fetchActivities = async () => {
    try {
      const response = await axios.get("https://test.mcetit.drmcetit.com/api/profile/dashboard/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      console.log("Server Response:", response.data);

      if (response.data && Array.isArray(response.data.recentActivities)) {
        setActivities(response.data.recentActivities);
      } else {
        setActivities([]);
      }
      setTotalActivities(response.data.totalAcitivities);
      setCGPA(response.data.cgpa !== null ? response.data.cgpa : "0");
      setparticipationBadge(response.data.particpationCount);
      setWinnerCount(response.data.WinnerCount);

      const wImg = `https://test.mcetit.drmcetit.com/${response.data.winnerBadge}`
      const pImg = `https://test.mcetit.drmcetit.com/${response.data.particpataionBadge}`
      setwinnerBadge(wImg);
      setparticpataionBadgeImg(pImg);

    } catch (error) {
      console.error("Error fetching activities:", error.response?.data);
      if (error.response?.data.code === "token_not_valid")
        localStorage.clear();
      setActivities([]);
    } finally {
      setLoading(false); // 👈 Stop loading in both success & error cases
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="d-flex">
      <StudentSideBar />
      <div className="flex-grow-1 p-4">

        <div className="mb-4 bg-white" style={{
          backgroundColor: "ffffff",
          position: "sticky",
          top: "0",
          zIndex: "9"
        }}>
          <h1 className="h3 fw-bold">Profile Dashboard</h1>
          <p className="text-muted">Manage your profile and co-curricular activities</p>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" variant="primary" />
            <span className="ms-3 fw-medium">Loading dashboard...</span>
          </div>
        ) : (
          <>
            <Row xs={1} md={2} lg={2} className="g-4 mb-4">
              <Col>
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <p className="text-muted small mb-0">Total Activities</p>
                        <h3 className="h2 fw-bold mb-0">{totalActivities}</h3>
                      </div>
                      <FaAward className="text-primary opacity-75 fs-4" />
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col>
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <p className="text-muted small mb-0">CGPA</p>
                        <h3 className="h2 fw-bold mb-0">{cgpa}%</h3>
                      </div>
                      <FaBook className="text-success opacity-75 fs-4" />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row xs={1} md={2} className="g-4">
              <Col>
                <Card>
                  <Card.Header className="bg-white">
                    <Card.Title className="h5 mb-0">Recent Activities</Card.Title>
                    <Card.Subtitle className="text-muted small mt-1">
                      Your recently submitted activities
                    </Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex flex-column gap-3">
                      {activities.map((activity, index) => (
                        <div
                          key={index}
                          className={`d-flex justify-content-between align-items-center ${index < activities.length - 1 ? "border-bottom pb-3" : ""}`}
                        >
                          <div>
                            <p className="mb-0 fw-medium">{activity.Title}</p>
                            <p className="text-muted small mb-0">{activity.Date}</p>
                          </div>
                          <span className={`badge ${["First", "Second", "Third"].includes(activity.Place) ? "badge-place" : "badge-participation"}`}>
                            {activity.Place}
                          </span>
                        </div>
                      ))}
                      {activities.length === 0 && (
                        <p className="text-muted small">No recent activities available.</p>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col>
                <Card>
                  <Card.Header className="bg-white">
                    <Card.Title className="h5 mb-0">Activity Categories</Card.Title>
                    <Card.Subtitle className="text-muted small mt-1">
                      Distribution of your activities
                    </Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col xs={12} md={6} className="text-center">
                        <p className="text-muted small m-0">Participation Badge</p>
                        <img src={particpataionBadgeImg} style={{ width: "40vw" }} className="img-fluid" alt="Participation Badge" />
                        <p className="text-muted small m-0">Participation count: {participationBadge}</p>
                      </Col>
                      <Col xs={12} md={6} className="text-center">
                        <p className="text-muted small m-0">Winning Badge</p>
                        <img src={winnerBadge} style={{ width: "40vw" }} className="img-fluid" alt="Winner Badge" />
                        <p className="text-muted small m-0">Winning count: {WinnerCount}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  )
}
