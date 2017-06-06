import React from 'react';

const NoMatch = ({location}) => (
  <div>
    <h3>404:  No page found for {location.pathname}, please try again.</h3>
  </div>
)

export default NoMatch;
