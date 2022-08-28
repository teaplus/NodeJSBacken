/* eslint-disable prettier/prettier */
export class BillDetailDto {
  product: any;
  amount: number;
}
export class CreateBillDto {
  staffId: number;
  price: number;
  billDetail: BillDetailDto[];
}
