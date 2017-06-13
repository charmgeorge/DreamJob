var React = require('react');
var queryString = require('query-string');
var api = require('../actions/api');
var Link = ('react-router-dom').Link;
var PropTypes = ('prop-types');
var CompanyPreview = require('../components/CompanyPreview');
// var Loading = require('../components/Loading');

function Profile (props){
  console.log(props);
  var info = props.info;
  return (
      <CompanyPreview avatar={info.avatar_url} name={info.login}>
        <ul className='space-list-items'>

          {info.name && <li>{info.name}</li>}
          {info.location && <li>{info.location}</li>}
          {info.company && <li>{info.company}</li>}
          <li>Followers: {info.followers}</li>
          <li>Following: {info.following}</li>
          <li>Public Repos: {info.public_repos}</li>
          {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
        </ul>
      </CompanyPreview>
  )
}

// Profile.propTypes = {
//   info: PropTypes.object.isRequired
// }

function Player (props) {
  console.log('props,' , props);
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}} >Score: {props.score}</h3>
      <Profile info={props.profile}/>
    </div>
  )
}
//
// Player.propTypes = {
//   label: PropTypes.string.isRequired,
//   score: PropTypes.number.isRequired,
//   // profile: PropTypes.object.isRequired,
// }

class Results extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount(){
    var companies = queryString.parse(this.props.location.search)
    console.log(companies);
    api.battle([
      companies.companyOneName,
      companies.companyTwoName
    ])
      .then(function(results){
        if(results === null){
          return
            this.state(function(){
              return {
              error: 'there was an error',
              loading: false
            }
          });
        }
        return results
        this.setState(function() {
          return {
            error: null,
            winner: results[0],
            loser: results[1],
            loading: false
          }
        })
      }.bind(this))
  }

  render() {

    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;

    if(loading){
      return <h1>Loading...</h1> //<Loading />
    }

    if(error){
      return (
      <div>
        <p>{error}</p>
        <Link to='/battle'> Reset</Link>
      </div>
      )
    }

    return (
      <div>
        {/* {JSON.stringify(this.state,null,2)} */}
        
        {/* <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        /> */}
      </div>
    )
  }
}

export default Results;
