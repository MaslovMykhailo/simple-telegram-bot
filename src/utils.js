"use strict";

const log = {
  incomingMessage: im => {
    console.info(`Incoming message:
  HTTP Version: ${im.httpVersion},
  Method: ${im.method},
  Status code: ${im.statusCode},
  Status message: ${im.statusMessage},
  Host: ${im.headers.host},
  URL: ${im.url}`);
    console.info(im.headers);
  },

  redirect: po => {
    console.info(`Redirecting:
  Method: ${po.method},
  URL: ${po.url}`);
    console.info(po.headers);
  }
};

module.exports = {
  log
};
