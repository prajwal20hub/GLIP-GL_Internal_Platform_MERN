export default function CountWeekdays(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    // console.log(typeof(Date))
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay)) + 1; // add 1 to include both start and end dates
    let count = 0;
    for (let i = 0; i < diffDays; i++) {
      const day = new Date(startDate);
      // console.log(day);
      day.setDate(startDate.getDate() + i);
      if (day.getDay() !== 6 && day.getDay() !== 0) { // 6 is Saturday, 0 is Sunday
        count++;
      }
    }
    return count;
  }