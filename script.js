'use strict';

const apiKey = 'XmPyV0W24GFfqs2Re0lY0LV75jftx6Nrpez6gwKx'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);

  $('#results-list').empty();


  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].description.addresses}</p>
      <a href="${responseJson.data[i].url}">Website</a>
      </li>`
    )};

  $('#results').removeClass('hidden');
}


function seeSomeParks(query, limit=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    fields: query,
    limit,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-select-state').val();
    const maxResults = $('#js-max-results').val();
    seeSomeParks(searchTerm, maxResults);
  });
}

$(watchForm);