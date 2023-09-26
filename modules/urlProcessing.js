// modules/urlProcessing.js
const url = require('url');

function getUrlParams(request) {
  const parsedUrl = url.parse(request.url, true);
  return parsedUrl.query;
}

module.exports = {
  getUrlParams,
};
