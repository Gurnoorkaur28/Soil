// Email Regex taken from - https://stackoverflow.com/questions/60282362/regex-pattern-for-email
const EMAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password Regex
const MINONECHARUPPER = /.*[A-Z].*/;
const MINONECHARLOWER = /.*[a-z].*/;
const MINONECHARSPECIAL = /.*[\W_].*/;
const MINONENUMBER = /.*\d.*/;

/**
 * Ensures the name starts with at least one letter.
 * Allows for any number of additional words that may start with a space
 */
const NAMEREGEX = /^[A-Za-z]+([ \-'][A-Za-z]+)*$/;

module.exports = {
  EMAILREGEX,
  MINONECHARLOWER,
  MINONECHARUPPER,
  MINONECHARSPECIAL,
  MINONENUMBER,
  NAMEREGEX,
};
