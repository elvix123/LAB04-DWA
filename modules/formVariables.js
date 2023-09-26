// modules/formVariables.js
const querystring = require('querystring');

function getFormData(request) {
  return new Promise((resolve, reject) => {
    let data = '';

    request.on('data', chunk => {
      data += chunk.toString();
    });

    request.on('end', () => {
      const formData = querystring.parse(data);
      resolve(formData);
    });

    request.on('error', error => {
      reject(error);
    });
  });
}

module.exports = {
  getFormData,
};
