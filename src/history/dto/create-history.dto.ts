import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateHistoryDto {
    @IsNumber()
    @IsNotEmpty({ message: '잔액 입력.' })
    readonly balance: number;
  
    @IsNumber()
    readonly deposit: number;
  
    @IsNumber()
    readonly withdraw: number;
}
