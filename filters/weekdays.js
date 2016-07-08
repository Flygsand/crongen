'use strict';

const _ = require('highland')
    , moment = require('moment-timezone');

module.exports = (weekdays) => {
  weekdays =
    weekdays
      .map((w) => w.split('-'))
      .map((ws) => ({
        first: moment(ws[0], 'ddd').day(),
        last: moment(ws[1], 'ddd').day()
      }));

  return _.filter((d) => {
    return weekdays.some((w) => {
      return d.day() >= w.first && d.day() <= w.last;
    });
  });
};
