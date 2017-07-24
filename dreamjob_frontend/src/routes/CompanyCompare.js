var React = require('react');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var CompanyPreview = require('../components/CompanyPreview');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    var value = e.target.value;
    this.setState(function(){
      return {
        name:value
      }
    })
  }

  handleSubmit(event){
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.name
    )
  }

  render(){
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="name">
          {this.props.label}
        </label>
        <input
          id='name'
          placeholder='company name'
          type='text'
          autoComplete='off'
          value={this.state.name}
          onChange={this.handleChange}
        />
        <button type="submit" className="button" disabled={!this.state.name} >
          submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

PlayerInput.defaultProps = {
  label: 'Company Name'
}

class Battle extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      companyOneName: '',
      companyTwoName: '',
      companyOneImage: null,
      companyTwoImage: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, name){
    this.setState(function(){
      var newState = {};
      newState[id+'Name'] = name;
      newState[id + 'Image'] = 'https://github.com/' + name + '.png?size=200';
      return newState;
    })
  }

  handleReset(id){
    this.setState(function (){
      var newState = {};
      newState[id+'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    })
  }

  render(){
    var match = this.props.match;
    var companyOneName = this.state.companyOneName;
    var companyTwoName = this.state.companyTwoName;
    var companyOneImage = this.state.companyOneImage;
    var companyTwoImage = this.state.companyTwoImage;

    return (
      <div>
        <div className="row">
          Battle!
          {!companyOneName &&
            <PlayerInput
              id="companyOne"
              label="Company One"
              onSubmit={this.handleSubmit}
          />}

          {companyOneImage !== null &&
            <CompanyPreview
              avatar={companyOneImage}
              name={companyOneName}
            >
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'companyOne' )}
                >
                  Reset
              </button>
            </CompanyPreview>
          }

          {!companyTwoName &&
            <PlayerInput
              id="companyTwo"
              label="Company Two"
              onSubmit={this.handleSubmit}
          />}

          {companyTwoImage !== null &&
            <CompanyPreview
              avatar={companyTwoImage}
              name={companyTwoName}
            >
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'companyTwo' )}
                >
                  Reset
              </button>
            </CompanyPreview>
          }
        </div>

        {companyOneImage && companyTwoImage &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: '?companyOneName='+ companyOneName + '&companyTwoName=' + companyTwoName
            }}>
              Battle!
          </Link>
        }
      </div>
    )
  }
}

module.exports = Battle;
// module.exports = Nav;
