import React from 'react';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const AboutUs = () => (
  <div>
    <h3>!false Team</h3>
    <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>LinkedIn</th>
            <th>GitHub</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nick Bouldien</td>
            <td><Link to="https://www.linkedin.com/in/nickbouldien/"> /nickbouldien</Link></td>
            <td><Link to="https://github.com/nickbouldien"> @nickbouldien</Link></td>
          </tr>
          <tr>
            <td>Brady Espinosa</td>
            <td><Link to="https://www.linkedin.com/in/nickbouldien/"> /nickbouldien</Link></td>
            <td><Link to="https://github.com/brady-espinosa"> @brady-espinosa</Link></td>
          </tr>
          <tr>
            <td>Charmaine George</td>
            <td><Link to="https://www.linkedin.com/in/nickbouldien/"> /nickbouldien</Link></td>
            <td><Link to="https://github.com/charmgeorge"> @charmgeorge</Link></td>
          </tr>
          <tr>
            <td>Melissa Nunez</td>
            <td><Link to="https://www.linkedin.com/in/nickbouldien/"> /nickbouldien</Link></td>
            <td><Link to="https://github.com/DataIsMeta"> @DataIsMeta</Link></td>
          </tr>
          <tr>
            <td>Miran Romick</td>
            <td><Link to="https://www.linkedin.com/in/nickbouldien/"> /nickbouldien</Link></td>
            <td><Link to="https://github.com/miranromick"> @miranromick</Link></td>
          </tr>
          <tr>
            <td>Antonio Navarro</td>
            <td><Link to="https://www.linkedin.com/in/nickbouldien/"> /nickbouldien</Link></td>
            <td><Link to="https://github.com/aln4e"> @aln4e</Link></td>
          </tr>
          <tr>
            <td>Teddy Reece</td>
            <td><Link to="https://www.linkedin.com/in/nickbouldien/"> /nickbouldien</Link></td>
            <td><Link to="https://github.com/TeddyReece"> @TeddyReece</Link></td>
          </tr>
        </tbody>
      </Table>
   </div>
)

export default AboutUs;
