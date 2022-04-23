import React from 'react'
import { Row, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Category = ({ category }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Row>
        <Link to={`/categories/${category.name}`}>
          <Card.Img
            src={category.imageSrc}
            alt={category.imageAlt}
            fluid="true"
            rounded="true"
          ></Card.Img>
        </Link>
      </Row>
    </Card>
  )
}

export default Category
