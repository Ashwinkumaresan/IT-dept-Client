import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const AssociationEvents = () => {
    const [fetchAssociationEvents, setFetchAssociationEvents] = useState([]);

    useEffect(() => {
        const fetchAssociationEvents = async () => {
            try {
                const response = await axios.get("https://test.mcetit.drmcetit.com/api/association/event/");
                console.log(response.data);

                setFetchAssociationEvents(response.data);
            } catch (error) {
                console.error("Error fetching data:", error.response?.data || error.message);

            }
        };

        fetchAssociationEvents();
    }, []);

    return (
        <div className='pt-5'>
            <div className=' container mt-5'>
                <div className="card p-3 shadow">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <h1>Events</h1>
                            <p style={{ fontSize: "14px" }}>Infobee is a student-driven technical association that typically operates under the Information Technology (IT) department . It aims to create a platform for students to explore and expand their knowledge in the field of information technology. The association organizes a variety of events such as technical workshops, seminars, hackathons, coding competitions, and guest lectures from industry professionals.
                                Infobee provides opportunities for students to enhance their practical skills, collaborate on projects, and stay up-to-date with the latest trends in the IT sector. It also serves as a space for students to network, share ideas, and work on innovative solutions to real-world problems. By doing so, Infobee helps students bridge the gap between theoretical knowledge and practical application, preparing them for successful careers in technology.</p>
                        </div>
                        <div className="col-12 col-md-6">
                            <img src="/exploreEvents.png" alt="Explore Events" className='img-fluid' />
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    {fetchAssociationEvents.map((event, index) => (
                        <div className="col-12 col-md-4 mb-4" key={index}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-2">
                                        <div className="card-title h5">{event.name}</div>
                                        <div className="badge bg-dark d-flex align-items-center">{event.category}</div>
                                    </div>
                                    <div className="card-text text-muted mb-1" style={{textAlign:"justify"}}>{event.description}</div>
                                    <div className="card-text text-muted">{event.date}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
