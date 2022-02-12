// Serves static site from /build

import * as statik from 'node-static';
import http from 'http';

const file = new statik.Server('./build');
http.createServer(function (request, response) {
  response.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  request.addListener('end', function () {
    file.serve(request, response);
  }).resume();
}).listen(process.env.PORT || 5000);
