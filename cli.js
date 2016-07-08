'use strict';

const _ = require('highland')
    , moment = require('moment-timezone')
    , year = require('./timers/year')
    , weekdays = require('./filters/weekdays')
    , holidays = require('./filters/holidays')
    , ranges = require('./filters/ranges');

module.exports = (args) => {
  if (!args._[1]) {
    throw new Error('timezone must be specified');
  }
  moment.tz.setDefault(args._[1]);

  let country = args.c
    , region = args.r
    , exclude = args.e
    , format = args.f || 'cloudwatch'
    , weekdays_ = args.w || ['Mon-Fri']
    , hours = args.h || ['9-17']
    , year_ = args.y || moment().year()
    , pl = [];

  pl.push(year(year_));
  pl.push(weekdays(Array.isArray(weekdays_) ? weekdays_ : [weekdays_]));
  if (country) {
    pl.push(holidays(country, region));
  }
  if (exclude) {
    pl.push(ranges(Array.isArray(exclude) ? exclude : [exclude]));
  }
  pl.push(require('./formatters/' + format)(Array.isArray(hours) ? hours : [hours]));
  pl.push(_.intersperse('\n'));

  _.pipeline.apply(_, pl).pipe(process.stdout);
};
