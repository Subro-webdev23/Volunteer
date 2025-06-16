import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Volunteer Management Website</h1>

      <h2>Purpose</h2>
      <ul>
        <li>A User can Post here to If he find Volunteer</li>
        <li>User can Be a Volenteer If he Want</li>
        <li>User can Update her Own Post </li>
        <li>User can Delete her Own Post </li>
        <li>User can Cencle her Be a Volunteer </li>

        <h3>Live Link : https://assignment-11-auth-cfa03.web.app/</h3>
      </ul>
      <h2>Key Features</h2>
      <p>This Website has many of key features seach as Banner section, Volunteer Needs Now Section, Volunteer of the Month section, Add post route and others. This website user friendly and smooth!</p>

      <h3>npm Packages</h3>
      <ol>
        <li>tailwindcss/vite</li>
        <li>axios</li>
        <li>firebase</li>
        <li>framer-motion</li>
        <li>react-helmet</li>
        <li>react-icons</li>
        <li>react-router</li>
        <li>sweetalert2":</li>
      </ol>

    </>
  )
}

export default App
