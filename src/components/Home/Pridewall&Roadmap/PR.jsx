import React from 'react'
import { Link } from 'react-router-dom'

export const PR = () => {
    return (
        <section className="w-100 py-5 bg-light mt-5">
            <div className='container'>
            <div className="row">
                <div className="col-12 col-md-6">
                    <h3 className='mb-4'>Pride Wall</h3>
                    <p className='fs-14 justify'>
                        The Pride Wall is a dedicated space within the IT Department that celebrates the achievements, milestones, and proud moments of our students and faculty. It showcases awards, competition victories, research publications, successful projects, and notable contributions made by the department in various technical and non-technical domains.
                        <br />
                        This space not only honors individual and collective accomplishments but also inspires future batches to aim higher and contribute actively to the department's legacy of excellence. From national hackathon wins to innovative research solutions and impactful community projects, the Pride Wall stands as a testament to the talent, hard work, and passion that defines our IT community.
                    </p>
                    <Link to="/gallery" className='btn btn-primary mb-4 mt-2 w-100'>View More</Link>
                </div>
                <div className="col-12 col-md-6">
                    <h3 className='mb-4'>Roadmap</h3>
                    <p className='fs-14 justify'>
                        The Roadmap section of the IT Department serves as a structured guide outlining the academic, technical, and professional journey designed for students. It highlights key milestones, skill-building opportunities, certifications, internships, and project phases that students can follow throughout their course.
                        <br />
                        This section acts as a blueprint to help students plan their learning paths effectively, ensuring they stay aligned with industry trends and departmental goals. From foundational training to advanced workshops and placement preparation, the Roadmap empowers students to visualize and achieve their academic and career ambitions.
                    </p>
                    <Link to="/roadmap-domains" className='btn btn-primary mb-4 mt-2 w-100'>View More</Link>
                </div>
            </div>
        </div>
        </section>
    )
}
