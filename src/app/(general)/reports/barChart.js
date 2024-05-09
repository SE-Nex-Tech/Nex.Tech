export default (data) => {

  const getWeekStartDate = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const getWeekEndDate = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 7);
    return new Date(d.setDate(diff));
  };

  const getMonthStartDate = (date) => {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  };

  const formatDateRange = (startDate, endDate) => {
    const startMonth = startDate.toLocaleString('default', { month: 'short' });
    const endMonth = endDate.toLocaleString('default', { month: 'short' });
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  };

  const numWeeks = Math.ceil((data[data.length - 1].date - data[0].date) / (7 * 24 * 60 * 60 * 1000));
  const isMonthly = numWeeks > 10;

  const requestsByPeriod = isMonthly ? {} : [];

  data.forEach((request) => {
    const startDate = isMonthly ? getMonthStartDate(request.date) : getWeekStartDate(request.date);
    const endDate = isMonthly ? new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0) : getWeekEndDate(startDate); // Adjusted to get end of the week

    const periodKey = isMonthly ? startDate.toLocaleString('default', { month: 'short', year: 'numeric' }) : formatDateRange(startDate, endDate);

    if (isMonthly) {
      if (!requestsByPeriod[periodKey]) {
        requestsByPeriod[periodKey] = {
          dateRange: periodKey,
          bookCount: 0,
          gameCount: 0,
        };
      }
    } else {
      if (!requestsByPeriod.some(period => period.dateRange === periodKey)) {
        requestsByPeriod.push({
          dateRange: periodKey,
          bookCount: 0,
          gameCount: 0,
        });
      }
    }

    if (request.type === 'Book') {
      if (isMonthly) {
        requestsByPeriod[periodKey].bookCount++;
      } else {
        const period = requestsByPeriod.find(period => period.dateRange === periodKey);
        period.bookCount++;
      }
    } else if (request.type === 'Boardgame') {
      if (isMonthly) {
        requestsByPeriod[periodKey].gameCount++;
      } else {
        const period = requestsByPeriod.find(period => period.dateRange === periodKey);
        period.gameCount++;
      }
    }
  });

  const barChartData = Array.isArray(requestsByPeriod) ? requestsByPeriod : Object.values(requestsByPeriod);

  return barChartData;
}
