'use strict';

const _ = require('highland');

module.exports = (ranges) => {
  ranges = ranges.map((r) => {
    const parts = r.split('-').map((p) => p.split('/'));
    return {
      start: parts[0],
      end: parts[1]
    };
  });

  return _.filter((d) => {
    const month = d.month() + 1;
    return ranges.every((r) => {
      return (month < r.start[1] || (month == r.start[1] && d.date() < r.start[0])) ||
             (month > r.end[1] || (month == r.end[1] && d.date() > r.end[0]));
    });
  });
};
