function isLeapYear(arg) {
    let year = new Date(arg);
    if (!isNaN(year)) {
        year = year.getFullYear();
        if (year % 400 === 0 || year % 100 !== 0 && year % 4 === 0) {
            return `${year} is a leap year`;
        } else {
            return `${year} is not a leap year`;
        }
    } else {
        return year;
    }
}

isLeapYear('2020-01-01 00:00:00');