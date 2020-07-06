export const getUpcomingLaunches = async (num) => {
  try {
    const response = await fetch(`https://launchlibrary.net/1.3/launch/next/${num}`);
    if(response.status === 200) {
      const launches = await response.json();
      return launches;
    }
  } catch(e) {
    return new Error('There was a problem fetching upcoming launches');
  }
}

export const getPastLaunches = async (windowStart, windowEnd) => {
  try {
    const response = await fetch(`https://launchlibrary.net/1.3/launch/${windowStart}/${windowEnd}`);

    if(response.status === 200) {
      const launches = await response.json();
      return launches;
    }
  } catch(e) {
    return new Error('There was a problem retrieving past launches');
  }
}