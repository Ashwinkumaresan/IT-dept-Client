import React from 'react'

export const Feed = () => {
    return (
        <>
            <div className="container py-5">
                <h1 className="mt-5 fw-bold text-center display-4">Blog's</h1>
                <p className="text-center">Welcome to the blog! Here you'll find the latest updates of our student's.</p>
                {/* Starting of card */}
                <div className='card p-5'>
                    {/* Header */}
                    <div className='d-flex justify-content-between align-items-center'>
                        {/* Left */}
                        <div className='d-flex align-items-center gap-2'>
                            <img src="/Profile_dup.png" alt="profile" className='border rounded-pill' style={{
                                width: '60px',
                            }} />
                            <div>
                                <p className='m-0 fw-bold'>User Name</p>
                                <p className='m-0' style={{ fontSize: "13px" }}>Year</p>
                            </div>
                        </div>
                        {/* Right */}
                        <div>
                            <p>Date</p>
                        </div>
                    </div>
                    <hr />
                    {/* Des */}
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab perferendis illo optio quasi consequatur, expedita quia libero debitis. Fuga incidunt cupiditate libero veniam, dolores ipsa iure iste accusantium quo facilis! <br />
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui distinctio mollitia laboriosam incidunt ratione dolorum repudiandae nostrum perspiciatis! Eveniet, tempora.
                        </p>
                    </div>
                    {/* image */}
                    <div>
                        <div className="row">
                            <div className="col-12 text-center">
                                <img src="/Association.jpg" className='img-fluid ' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
