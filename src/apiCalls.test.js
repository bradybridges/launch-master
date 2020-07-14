import { getUpcomingLaunches, getPastLaunches } from './apiCalls';
import { mockLaunches } from './mockLaunches';

describe('getUpcomingLaunches', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockLaunches),
      });
    });
  });

  it('getUpcomingLaunches should be called with the correct URL and parameter', () => {
    const expectedURL = 'https://launchlibrary.net/1.3/launch/next/10';
    getUpcomingLaunches(10);
    expect(window.fetch).toHaveBeenCalledWith(expectedURL);
  });

  it('should return an error if the response is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolves({ ok: false });
    });
    try {
      getUpcomingLaunches(10);
    } catch(e) {
      expect(e).rejects.toEqual(Error('There was a problem fetching upcoming launches'));
    }
  });

  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('There was a problem retrieving upcoming launches'));
    });
    try {
      getUpcomingLaunches(10);
    } catch(e) {
      expect(e).rejects.toEqual(Error('There was a problem retrieving upcoming launches'));
    }
  });
});

describe('getPastLaunches', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockLaunches),
      });
    });
  });

  it('getPastLaunches should be called with the correct URL and parameter', () => {
    const expectedURL = 'https://launchlibrary.net/1.3/launch/2020-06-26/2020-07-10';
    getPastLaunches('2020-06-26', '2020-07-10');
    expect(window.fetch).toHaveBeenCalledWith(expectedURL);
  });

  it('should return an error if the response is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolves({ ok: false });
    });

    try{
      getPastLaunches('2020-06-26', '2020-07-10');
    } catch(e) {
      expect(e).rejects.toEqual(Error('There was a problem retrieving past launches'));
    }
  });

  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('There was a problem retrieving past launches'));
    });
    try {
      getPastLaunches('2020-06-26', '2020-07-10');
    } catch(e) {
      expect(e).rejects.toEqual(Error('There was a problem retrieving past launches'));
    }
  });
});