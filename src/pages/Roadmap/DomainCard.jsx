import React from 'react'
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export const DomainCard = ({domain}) => {
  return (
    <Card className="h-100">
    <Card.Footer className="bg-white border-top-0">
      <Link to={`/roadmap/${domain.id}`} className="w-100">
        <Button variant="dark" className="w-100">
        {domain.title}
        </Button>
      </Link>
    </Card.Footer>
  </Card>
  )
}
