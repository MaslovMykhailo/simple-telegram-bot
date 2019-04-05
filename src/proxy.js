"use strict";

const { log } = require("./utils");

const proxify = (provider, request, response) => {
  const proxyOptions = {
    headers: request.headers,
    method: request.method
  };

  log.redirect({
    url: request.url,
    ...proxyOptions
  });

  const proxy = provider.request(request.url, proxyOptions);

  request.pipe(
    proxy,
    { end: true }
  );

  proxy.on("response", res => {
    log.incomingMessage(res);
    res.headers["ya-bil-tut"] = "true";
    response.writeHead(res.statusCode, res.statusMessage, res.headers);
    res.pipe(
      response,
      { end: true }
    );
  });
};

module.exports = proxify;
