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
            <td><a href="https://www.linkedin.com/in/nickbouldien/"> /nickbouldien</a></td>
            <td><a href="https://github.com/nickbouldien"> @nickbouldien</a></td>
          </tr>
          <tr>
            <td>Brady Espinosa</td>
            <td><a href="https://www.linkedin.com/in/nickbouldien/"> /nickbouldien</a></td>
            <td><a href="https://github.com/brady-espinosa"> @brady-espinosa</a></td>
          </tr>
          <tr>
            <td>Charmaine George</td>
            <td><a href="https://www.linkedin.com/in/nickbouldien/"> /nickbouldien</a></td>
            <td><a href="https://github.com/charmgeorge"> @charmgeorge</a></td>
          </tr>
          <tr>
            <td>Melissa Nunez</td>
            <td><a href="https://www.linkedin.com/in/nickbouldien/"> /nickbouldien</a></td>
            <td><a href="https://github.com/DataIsMeta"> @DataIsMeta</a></td>
          </tr>
          <tr>
            <td>Miran Romick</td>
            <td><a href="https://www.linkedin.com/in/nickbouldien/"> /nickbouldien</a></td>
            <td><a href="https://github.com/miranromick"> @miranromick</a></td>
          </tr>
          <tr>
            <td>Antonio Navarro</td>
            <td><a href="https://www.linkedin.com/in/nickbouldien/"> /nickbouldien</a></td>
            <td><a href="https://github.com/aln4e"> @aln4e</a></td>
          </tr>
          <tr>
            <td>Teddy Reece</td>
            <td><a href="https://www.linkedin.com/in/nickbouldien/"> /nickbouldien</a></td>
            <td><a href="https://github.com/TeddyReece"> @TeddyReece</a></td>
          </tr>
        </tbody>
      </Table>
   </div>
)

export default AboutUs;
