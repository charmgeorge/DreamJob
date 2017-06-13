var React = require('react');
var PropTypes = require('prop-types');

function CompanyPreview (props){
  return (
    <div>
      <div className="column">
        <img
          className="avatar"
          src={props.avatar}
          alt={'Image for ' + props.name }
        />
        <h2 className='name'>{props.name}</h2>
      </div>
      {props.children}

    </div>
  )
}

CompanyPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

module.exports = CompanyPreview;
