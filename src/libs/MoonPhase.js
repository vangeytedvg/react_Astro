export function MoonPhase(year, month, day) {

  let e = 0;
  let c = 0;
  let jd = 0;
  let b = 0;

  if (month < 3) {
    year--;
    month += 12;
  }

  ++month;
  c = 365.25 * year;
  e = 30.6 * month;
  jd = c + e + day - 694039.09; // jd is total days elapsed
  jd /= 29.5305882; // divide by the moon cycle
  b = parseInt(jd); // int(jd) -> b, take integer part of jd
  jd -= b; // subtract integer part to leave fractional part of original jd
  b = Math.round(jd * 8); // scale fraction from 0-8 and round

  if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0

  switch (b) {
    case 0:
      return 'new-moon';
    case 1:
      return 'waxing-crescent-moon';
    case 2:
      return 'quarter-moon';
    case 3:
      return 'waxing-gibbous-moon';
    case 4:
      return 'full-moon';
    case 5:
      return 'waning-gibbous-moon';
    case 6:
      return 'last-quarter-moon';
    case 7:
      return 'waning-crescent-moon';
    default:
      return 'ERROR';
  }
}

// Moon.phase('2018', '01', '19');