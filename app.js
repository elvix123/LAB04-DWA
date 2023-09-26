// app.js

const http = require('http');
const fs = require('fs');
const { getFormData } = require('./modules/formVariables');
const { getUrlParams } = require('./modules/urlProcessing');
const {
  splitWords,
  extractSubstring,
  removeSpaces,
  capitalize,
  toLowerCase,
  toUpperCase,
  countCharacters,
} = require('./modules/textProcessing');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile('./public/index.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && req.url === '/calculate') {
    getFormData(req)
      .then(formData => {
        const { num1, num2, operator } = formData;
        const result = calculate(parseFloat(num1), parseFloat(num2), operator);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Result: ${result}`);
      })
      .catch(error => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      });
  } else if (req.method === 'POST' && req.url === '/process-text') {
    getFormData(req)
      .then(formData => {
        const { text, operation } = formData;
        let processedText = '';

        switch (operation) {
          case 'splitWords':
            processedText = splitWords(text).join(', ');
            break;
          case 'extractSubstring':
            processedText = extractSubstring(text, 2, 5);
            break;
          case 'removeSpaces':
            processedText = removeSpaces(text);
            break;
          case 'capitalize':
            processedText = capitalize(text);
            break;
          case 'toLowerCase':
            processedText = toLowerCase(text);
            break;
          case 'toUpperCase':
            processedText = toUpperCase(text);
            break;
          case 'countCharacters':
            processedText = `Character Count: ${countCharacters(text)}`;
            break;
          default:
            processedText = 'Invalid operation';
        }

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(processedText);
      })
      .catch(error => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

function calculate(num1, num2, operator) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      return 'Invalid operator';
  }
}

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
