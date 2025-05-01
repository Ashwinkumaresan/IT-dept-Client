import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const AssociationEvents = () => {
  const [fetchAssociationEvents, setFetchAssociationEvents] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchAssociationEvents = async () => {
      try {
        const response = await axios.get("https://test.mcetit.drmcetit.com/api/association/event/");
        console.log(response.data);
        setFetchAssociationEvents(response.data);
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
        setLoading(false);  // Ensure loading is set to false even in case of error
      }
    };

    fetchAssociationEvents();
  }, []);

  return (
    <div className="pt-5">
      <div className="container mt-5">
        {/* Event Header Section */}
        <div className="p-3">
          <div className="row">
            <div className="col-12 col-lg-6 text-center">
              <img src="/exploreEvents.png" alt="Explore Events" className="img-fluid" />
            </div>
            <div className="col-12 col-lg-6 d-flex align-items-center">
              <p className="fs-14 justify">
                Get ready to witness a celebration of talent, innovation, and teamwork as our association proudly presents yet another vibrant gathering. This event is crafted to inspire, challenge, and connect students from all backgrounds, whether you're a tech enthusiast, a creative thinker, or someone who thrives on healthy competition. With a perfect blend of technical challenges, interactive sessions, and fun-filled activities, there's something for everyone to experience and enjoy.
                <br />
                Join us as we come together to learn, compete, and create unforgettable memories. From skill-based competitions and team-building games to creative showcases and exciting prizes, each segment is designed to sharpen your abilities and spark new connections.
                <br />
                Unleash your potential, embrace new opportunities, and make this event an extraordinary celebration of passion and possibilities.
              </p>
            </div>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          // Events Section
          <div className="row my-5">
            {fetchAssociationEvents.map((event, index) => (
              <div className="col-12 col-md-3 col-lg-4 mb-4" key={index}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="card-title h5">{event.name}</div>
                      <div className="badge bg-dark d-flex align-items-center">{event.category}</div>
                    </div>
                    <div className="card-text text-muted my-1 justify fs-14">{event.description}</div>
                    <div className="card-text text-muted">{event.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
