import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div>Home</div>
      <Link to="/book/1">book 1</Link>
      <Link to="/book/2">book 2</Link>
    </div>
  )
}

export default Home
