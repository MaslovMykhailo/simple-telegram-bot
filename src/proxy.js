"use strict";

const proxify = (provider, request, response) => {
  const proxyOptions = {
    headers: request.headers,
    method: request.method
  };
  const proxy = provider.request(request.url, proxyOptions);

  request.pipe(
    proxy,
    { end: true }
  );

  proxy.on("response", res => {
    res.headers["my-data"] = "some_val";
    response.writeHead(res.statusCode, res.statusMessage, res.headers);
    res.pipe(
      response,
      { end: true }
    );
  });
};

module.exports = proxify;
