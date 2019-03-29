// random URL generator (8 char URL)

"use strict";

module.exports = function() {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678901234567890123456789";
  let url = "";
  for (let i = 0; i < 8; i++) {
    url += chars[Math.floor(Math.random() * chars.length)];
  }
  return url;
};

