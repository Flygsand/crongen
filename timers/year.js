'use strict';

const _ = require('highland')
    , moment = require('moment-timezone');

module.exports = (year) => {
  let d = moment([year]);

  return _((push, next) => {
    push(null, d);
    d = moment(d).add(1, 'days');
    if (d.year() === year) {
      next();
    } else {
      push(null, _.nil);
    }
  });
};
