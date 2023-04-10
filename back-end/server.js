#!/usr/bin/env node

const http = require('http');
const express = require('express');
const app = express();
const port = 3005;


const server = http.createServer(app);
// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
  listener.close()
}

module.exports = {
  close: close,
}