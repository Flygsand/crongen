'use strict';

const _ = require('highland')
    , moment = require('moment-timezone')
    , http = require('http');

module.exports = (country, region) => {
  let holidays
    , apiUrl = `http://kayaposoft.com/enrico/json/v1.0/index.php?action=getPublicHolidaysForYear&country=${country}&region=${region || ''}`;

  function isHoliday(d) {
    return holidays.some((h) => d.isSame(h, 'day'));
  }

  return _.consume((err, d, push, next) => {
    if (err) {
      push(err);
      next();
    } else if (d === _.nil) {
      push(null, _.nil);
    } else {
      if (!holidays) {
        http.get(`${apiUrl}&year=${d.year()}`, (res) => {
          let raw = []
            , hs;
          res.on('data', (chunk) => {
            raw.push(chunk);
          });
          res.on('end', () => {
            if (res.statusCode >= 400) {
              push(new Error(res.statusMessage));
            } else {
              try {
                hs = JSON.parse(Buffer.concat(raw).toString('utf8'));
                if (hs.error) {
                  push(new Error(hs.error));
                } else {
                  holidays = hs.map((h) => {
                    const hd = h.date;
                    return moment([hd.year, hd.month, hd.day]);
                  });

                  if (!isHoliday(d)) {
                    push(null, d);
                  }
                }
              } catch (e) {
                push(e);
              }
            }
            next();
          });
        }).on('error', (e) => {
          push(e);
          next();
        });
      } else {
        if (!isHoliday(d)) {
          push(null, d);
        }
        next();
      }
    }
  });
};
