'use strict';

const _ = require('highland')
    , moment = require('moment-timezone');

function cron(days, hours, minute) {
  const ds = days.map((d) => d.date())
      , month = days[0].month() + 1
      , year = days[0].year();
  return `${minute} ${hours[0]}-${hours[1]} ${ds} ${month} ? ${year}`;
}

module.exports = (hours) => {
  hours = hours.map((h) => {
    const hs = h.split('-');
    return [parseInt(hs[0]), parseInt(hs[1])];
  });
  let days = [];

  return _.consume((err, d, push, next) => {
    function flush() {
      hours.forEach((h) => {
        const dss = []
            , dur = h[1] - h[0];
        days.forEach((d) => {
          const offset = moment(d).hour(h[0]).utcOffset();
          if (dss.length === 0 || dss[dss.length - 1][0] !== offset) {
            dss.push([offset, d]);
          } else {
            dss[dss.length - 1].push(d);
          }
        });

        dss.forEach((ds) => {
          const hourOffset = Math.ceil(ds[0] / 60)
              , minuteOffset = Math.abs(ds[0]) % 60
              , hour = h[0] - hourOffset;

          push(null, cron(ds.slice(1), [hour, hour + dur], minuteOffset));
        });
      });

      days = [];
    }

    if (err) {
      push(err);
      next();
    } else if (d === _.nil) {
      if (days.length > 0) {
        flush();
      }

      push(null, _.nil);
    } else {
      if (days.length > 0 && days[days.length - 1].month() !== d.month()) {
        flush();
      }

      days.push(d);
      next();
    }
  });
};
