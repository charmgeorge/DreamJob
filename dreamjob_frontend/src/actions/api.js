var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;

//glassdoor api keys:
var id = 157533;
var key = "cE2dvplWMTK";
// var ip = 0.0.0.0;

var url = `http://api.glassdoor.com/api/api.htm?t.p=${id}&t.k=${key}&userip=0.0.0.0&useragent=&format=json&v=1&action=employers`
http://api.glassdoor.com/api/api.htm?t.p=157533&t.k=cE2dvplWMTK&userip=0.0.0.0&useragent=&format=json&v=1&action=employers`

// app.get('/glassdoor/:company', function (request, response) {
//   let company = request.params['company'];
//   Glassdoor.findOneCompany(company,{country:""}).then(function (data) {
//       if(Object.keys(data).length === 0){
//         response.status(400)
//         response.json({error:err});
//       } else {
//         response.json({
//           data:data
//         })
//       }
//     })
//       .catch(function (err) {
//           response.status(400)
//           response.json({error:err});
//       });
// });

// function getCompanyProfile(companyName){
//   return axios.get( url + `&q=${companyName}`, { headers: {'Content-Type': 'application/json'} })
//     .then(function(company){
//       console.log(company);
//       return company;  //compnay.data??
//     })
// }

function getCompanyProfile(companyName){
  const params = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
  }
  fetch(url + `&q=${companyName}`, params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        console.log(body);
        return body
      })
    }
  })
}

export function sort(attribute){
  const params = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
  }
  fetch("http://localhost:4000/sort/" + attribute, params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        // dispatcher.dispatch({
        //   type: 'SORT_JOBS',
        //   jobs: body.jobs
        // })
      })
    }
  }).catch(function(err){
      // jobStore.updateMessage("There was an error: " + err)
  })
}


// function getProfile(username){
//   return axios.get('https://api.github.com/users/' + username + params)
//     .then(function(user){
//       return user.data;
//     })
// }

// function getRepos(username){
//   return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
//     .then(function(user){
//       return user.data;
//     })
// }
//
// function getStarCount(repos){
//   return repos.reduce(function (count, repo) {
//     return count + repo.stargazers_count;
//   }, 0)
// }

// function calculateScore(profile, repos){
//   var followers = profile.followers;
//   // console.log('repos', repos);
//   var totalStars = getStarCount(repos);
//
//   return (followers * 3) + totalStars;
// }

function handleError(error){
  console.warn(error);
  return null;
}

function getCompanyData(company){
  return axios.all([
    getCompanyProfile(company)
    // getRepos(company)
  ]).then(function(data){
    console.log('data in getCompanyData, ' , data);
    // var profile = data[0];
    // var repos = data[1];
    return {
      data: data
      // profile: profile,
      // score: calculateScore(profile, repos)
    }
  })
}

// function sortPlayers(players){
//   return players.sort(function(a,b){
//     return b.score - a.score;
//   })
// }


export function battle(companies) {
    // console.log(players);
    return axios.all(companies.map(getCompanyData))
      // .then(sortPlayers)
      .then(function(data){
        console.log('final,' , data);
        return data
      })
      .catch(handleError)
  }
  // ,
  // fetchPopularRepos: function(language){
  //   var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
  //
  //   return axios.get(encodedURI)
  //     .then(function(response) {
  //       return response.data.items
  //     })
  // }
