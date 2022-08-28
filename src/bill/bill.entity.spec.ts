import { Bill } from './bill.entity';

describe('BillEntity', () => {
  it('should be defined', () => {
    expect(new Bill()).toBeDefined();
  });
});
