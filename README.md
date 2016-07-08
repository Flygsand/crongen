# crongen

Generate cron schedules that account for office hours, daylight savings time, holidays and more.

## Usage

```bash
$ npm install -g crongen
$ crongen -t Europe/Stockholm -c swe
0 8-16 1,4,5,6,7,8,11,12,13,14,15,18,19,20,21,22,25,26,27,28,29 1 ? 2016
0 8-16 2,3,4,5,8,9,10,11,12,15,16,17,18,19,22,23,24,25,26,29 2 ? 2016
0 8-16 1,2,3,4,7,8,9,10,11,14,15,16,17,18,21,22,23,24,25 3 ? 2016
0 7-15 28,29,30,31 3 ? 2016
0 7-15 1,4,5,6,7,8,11,12,13,14,15,18,19,20,21,22,26,29 4 ? 2016
0 7-15 2,3,4,5,6,9,10,11,12,13,16,17,18,19,20,23,24,25,26,27,30,31 5 ? 2016
0 7-15 2,3,6,7,8,9,10,13,14,16,17,20,21,22,23,24,27,28,29,30 6 ? 2016
0 7-15 1,4,5,7,8,11,12,13,14,15,18,19,20,21,22,26,27,28,29 7 ? 2016
0 7-15 1,2,3,4,5,8,9,10,11,12,15,16,17,18,19,22,23,24,25,26,29,30,31 8 ? 2016
0 7-15 1,2,5,6,7,8,9,12,13,14,15,16,19,20,21,22,23,26,27,28,29,30 9 ? 2016
0 7-15 3,4,5,6,7,10,11,12,13,14,17,18,19,20,21,24,25,26,27,28 10 ? 2016
0 8-16 31 10 ? 2016
0 8-16 1,2,3,4,7,8,9,10,11,14,15,16,17,18,21,22,23,24,25,28,29,30 11 ? 2016
0 8-16 1,2,6,7,8,9,12,13,14,15,16,19,20,21,22,23,26,27,28,29,30 12 ? 2016
```

### Synopsis

**crongen [\<opts\>] \<timezone\>**

| Flag | Description                                                                         | Example    | Default      |
|------|-------------------------------------------------------------------------------------|------------|--------------|
| -f   | Cron format                                                                         | cloudwatch | cloudwatch   |
| -c   | Country identifier for holiday lookup ([reference](http://holidays.kayaposoft.com)) | deu        |              |
| -r   | Region identifier for holiday lookup ([reference](http://holidays.kayaposoft.com))  | Hamburg    |              |
| -e   | Date ranges to exclude (D/M format, can be supplied multiple times)                 | 6/7-6/8    |              |
| -w   | Weekdays to include                                                                 | Tue-Sat    | Mon-Fri      |
| -y   | Year for which to generate schedule                                                 | 2018       | Current year |

## Credits

[Kayaposoft](http://kayaposoft.com) for creating the wonderful, freely available [Enrico](http://kayaposoft.com/enrico) holiday API. Please consider giving them a donation.
