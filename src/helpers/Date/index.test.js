import { getMonth } from './index';

describe('Date helper', () => {
  describe('When getMonth is called', () => {
    it('should return "janvier" for date 2022-01-01', () => {
      const date = new Date('2022-01-01');
      const month = getMonth(date);
      expect(month).toBe('janvier');
    });

    it('should return "juillet" for date 2022-07-08', () => {
      const date = new Date('2022-07-08');
      const month = getMonth(date);
      expect(month).toBe('juillet');
    });
  });
});


