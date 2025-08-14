const http = require('http');
const { URL } = require('url');

const json = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(data));
};

const toNumber = (x) => {
  if (typeof x === 'number') return x;
  if (typeof x === 'string' && x.trim() !== '') {
    const n = Number(x);
    if (!Number.isNaN(n)) return n;
  }
  return NaN;
};

const readJsonBody = (req) =>
  new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        reject({ status: 413, message: 'Payload too large' });
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject({ status: 400, message: 'Invalid JSON body' });
      }
    });
  });

const server = http.createServer(async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;


  if (pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }


  const apiPaths = new Set([
    '/api/add',
    '/api/subtract',
    '/api/multiply',
    '/api/divide'
  ]);

  if (apiPaths.has(pathname)) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST, OPTIONS');
      return json(res, 405, { error: 'Method Not Allowed: use POST with JSON' });
    }

    try {
      const body = await readJsonBody(req);
      const num1 = toNumber(body.num1);
      const num2 = toNumber(body.num2);

      if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
        return json(res, 400, { error: 'Please provide numeric num1 and num2' });
      }

      let opt, result;

      switch (pathname) {
        case '/api/add':
          opt = 'add';
          result = num1 + num2;
          return json(res, 200, { opt, num1, num2, result });

        case '/api/subtract':
          opt = 'subtract';
          result = num1 - num2;
          return json(res, 200, { opt, num1, num2, result });

        case '/api/multiply':
          opt = 'multiply';
          result = num1 * num2;
          return json(res, 200, { opt, num1, num2, result });

        case '/api/divide':
          opt = 'divide';
          if (num2 === 0) {

            return json(res, 400, { opt, num1, num2, error: 'Divided by zero!' });
          }
          result = num1 / num2;
          return json(res, 200, { opt, num1, num2, result });
      }
    } catch (e) {
      const status = e?.status ?? 500;
      const message = e?.message ?? 'Internal Server Error';
      return json(res, status, { error: message });
    }
  }
  json(res, 404, { error: 'Not Found' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
