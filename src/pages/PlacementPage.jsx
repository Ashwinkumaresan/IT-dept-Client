// Sample placement data
const topPackages = [
    {
      id: 1,
      company: "Tech Giant Inc.",
      package: "$120,000",
      position: "Software Engineer",
      description: "Full-time role with comprehensive benefits and growth opportunities",
    },
    {
      id: 2,
      company: "Global Finance Ltd.",
      package: "$110,000",
      position: "Data Scientist",
      description: "Working with cutting-edge AI technologies in the financial sector",
    },
    {
      id: 3,
      company: "Innovation Systems",
      package: "$105,000",
      position: "Product Manager",
      description: "Leading product development for an industry-leading tech company",
    },
  ]
  
  const recruitingCompanies = [
    { id: 1, name: "Microsoft", logo: "https://via.placeholder.com/100" },
    { id: 2, name: "Google", logo: "https://via.placeholder.com/100" },
    { id: 3, name: "Amazon", logo: "https://via.placeholder.com/100" },
    { id: 4, name: "Apple", logo: "https://via.placeholder.com/100" },
    { id: 5, name: "Facebook", logo: "https://via.placeholder.com/100" },
    { id: 6, name: "IBM", logo: "https://via.placeholder.com/100" },
    { id: 7, name: "Oracle", logo: "https://via.placeholder.com/100" },
    { id: 8, name: "Intel", logo: "https://via.placeholder.com/100" },
    { id: 9, name: "Cisco", logo: "https://via.placeholder.com/100" },
    { id: 10, name: "Adobe", logo: "https://via.placeholder.com/100" },
    { id: 11, name: "Salesforce", logo: "https://via.placeholder.com/100" },
    { id: 12, name: "Netflix", logo: "https://via.placeholder.com/100" },
  ]
  
  export const PlacementPage = () => {
    return (
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h1 className="display-5 fw-bold">Placement Opportunities</h1>
            <p className="lead">Connecting our talented students with industry-leading companies</p>
          </div>
        </div>
  
        {/* Hero section with top packages */}
        <section className="mb-5">
          <div className="row mb-4">
            <div className="col">
              <h2 className="border-bottom pb-2">Top Placement Packages</h2>
              <p className="text-muted">Our students have received exceptional offers from leading companies</p>
            </div>
          </div>
  
          <div className="row g-4">
            {topPackages.map((pkg) => (
              <div key={pkg.id} className="col-md-4">
                <div className="card h-100 shadow border-primary hover-card">
                  <div className="card-header bg-primary text-white">
                    <h3 className="h5 mb-0">{pkg.company}</h3>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title text-center display-6">{pkg.package}</h4>
                    <h5 className="text-center mb-3">{pkg.position}</h5>
                    <p className="card-text">{pkg.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* Stats section */}
        <section className="mb-5 py-4 bg-light rounded">
          <div className="row text-center">
            <div className="col-md-3">
              <h3 className="display-4 fw-bold text-primary">95%</h3>
              <p>Placement Rate</p>
            </div>
            <div className="col-md-3">
              <h3 className="display-4 fw-bold text-primary">120+</h3>
              <p>Companies Visited</p>
            </div>
            <div className="col-md-3">
              <h3 className="display-4 fw-bold text-primary">$85K</h3>
              <p>Average Package</p>
            </div>
            <div className="col-md-3">
              <h3 className="display-4 fw-bold text-primary">1200+</h3>
              <p>Students Placed</p>
            </div>
          </div>
        </section>
  
        {/* Recruiting companies grid */}
        <section>
          <div className="row mb-4">
            <div className="col">
              <h2 className="border-bottom pb-2">Recruiting Companies</h2>
              <p className="text-muted">These industry leaders regularly recruit from our college</p>
            </div>
          </div>
  
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
            {recruitingCompanies.map((company) => (
              <div key={company.id} className="col">
                <div className="card h-100 border-0 shadow-sm hover-card">
                  <div className="d-flex justify-content-center align-items-center p-3" style={{ height: "150px" }}>
                    <img
                      src={company.logo || "/placeholder.svg"}
                      alt={`${company.name} logo`}
                      className="img-fluid"
                      style={{ maxHeight: "80px", maxWidth: "80px" }}
                    />
                  </div>
                  <div className="card-body text-center pt-0">
                    <h5 className="card-title">{company.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }
  