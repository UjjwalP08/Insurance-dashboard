import moment from "moment";

export const apiGenerator = (apiObject, exchangePair = {}, join = null) => {
  const apiObj = { ...apiObject };
  if (Object.keys(exchangePair).length) {
    Object.keys(exchangePair).forEach((el) => {
      apiObj.endpoint = apiObj.endpoint.replace(`:${el}`, exchangePair[el]);
    });
  }

  if (join) {
    apiObj.endpoint = `${apiObj.endpoint}${join}`;
  }
  return apiObj;
};

export function convertDateFormat(isoDateString) {
  const [datePart, timePart] = isoDateString.split("T");
  const [year, month, day] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export const tournamentType = (value) => {
  if (value === 1) {
    return 'StockPe Free'
  }
  else if (value === 2) {
    return 'Sponsored Free'
  }
  else if (value === 3) {
    return ' Paid - Coins Reward'
  }
  else if (value === 4) {
    return 'Paid - In-Kind'
  }
  else if (value === 5) {
    return 'Paid guaranteed'
  }
}

export const industryList = [
  {
    id: 1,
    label: 'Consumer Deliverable',
    value: 'Consumer Discretionary,Consumer Staples',
  },
  {
    id: 2,
    label: 'IT',
    value: 'Information Technology',
  },
  {
    id: 3,
    label: 'Industrials',
    value: 'Industrials',
  },
  {
    id: 4,
    label: 'Financials',
    value: 'Financials',
  },
]
export const marketTypeList = [
  {
    id: 1,
    label: 'Stock',
    value: 'Stock',
  },
  {
    id: 2,
    label: 'Crypto',
    value: 'Crypto',
  },

]
export const marketTypeFilterList = [
  {
    id: 0,
    label: 'All',
    value: '',
  },
  {
    id: 1,
    label: 'Stock',
    value: 'Stock',
  },
  {
    id: 2,
    label: 'Crypto',
    value: 'Crypto',
  },

]

export function calculateAverage(data) {
  // Extracting counts and sums from the data object
  const countsAndSums = Object.values(data).map(({ count, sum }) => ({
    count: Math.abs(count),
    sum: Math.abs(sum)
  }));

  // Calculating total count and total sum using reduce
  const { totalCount, totalSum } = countsAndSums.reduce((acc, { count, sum }) => ({
    totalCount: acc.totalCount + count,
    totalSum: acc.totalSum + sum
  }), { totalCount: 0, totalSum: 0 });

  // Calculating the average profit
  const averageValue = totalCount === 0 ? 0 : totalSum / totalCount;

  return averageValue;
}


export const totalRevenue = (revenue) => {
  return Math.abs(+revenue?.totalTournamentInvestment) - (+revenue?.totalTournamentEarnings || 0) - (+revenue?.totalRefunds || 0)
}

export const getAllIndustryList = (value) => {
  return industryList?.filter(ele => value === ele?.value)
}

export const TOURNAMENT_TYPE = {
  'paid': 'Paid',
  'free': 'Free',
}

export const CURRENCY = [
  {
    id: 1,
    label: 'Coin',
    value: 'Coin',
  },
  {
    id: 2,
    label: 'Dollar',
    value: 'Dollar',
  },
]
export const REGION_LIST = [
  {
    id: 1,
    label: 'India',
    value: 'India',
  },
  {
    id: 2,
    label: 'Global',
    value: 'Global',
  },
]

export const convertLocalToUTC = (localTime, format = 'YYYY-MM-DDTHH:mm:ss', utcFormat = 'YYYY-MM-DDTHH:mm:ss') => {
  return moment.utc(localTime, utcFormat).format(format);
}

export const convertUTCToLocal = (utcTime, format = 'YYYY-MM-DD HH:mm:ss') => {
  const localTime = moment.utc(utcTime).local().format(format);
  return localTime;
};