import React from 'react';
import {Link} from 'react-router-dom';

const AboutProject = () => (
  <div className="container">
    <h2>About the Project</h2>

    <div>
      <h3>Tech used:</h3>
      <ul>
        <li>JavaScript</li>
        <li>Node/Express</li>
        <li>React (with Flux)</li>
        <li>PostgreSQL</li>
        <li>Sequelize (ORM)</li>
        <li>react-bootstrap</li>
      </ul>
    </div>

    <div>
      <h3>APIs used:</h3>
      <ul>
        <li><a href="https://www.glassdoor.com/developer/index.htm">Glassdoor</a></li>
        <li><a href="https://developers.google.com/maps/documentation/static-maps/">Google Static Maps</a></li>
      </ul>
    </div>

    <div>
      <h3>Opportunites:</h3>
      <p>There are a few things we could have done differently or changed to get the best results out of the project.
        <ul>
          <li>Use ES6</li>
          <li>Use a linter (<a href="http://eslint.org/">ESLint</a>)</li>
          <li>Use static typing (<a href="https://flow.org/">Flow</a>)</li>
          <li>Make some components more reusable (be more DRY)</li>
          <li>Use more stateless functional components (separate logic vs presentation components better)</li>
        </ul>
      </p>
    </div>

    <div>
      <h3>TODOs:</h3>
      <p>Things we would like to do, but haven't worked on/finished yet:</p>
      <ul>
        <li>TODO</li>
      </ul>
    </div>

  </div>
)

export default AboutProject;
