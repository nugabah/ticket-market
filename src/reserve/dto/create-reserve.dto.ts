import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReserveDto {
    @IsString()
    @IsNotEmpty({ message: '제목을 입력해주세요.' })
    readonly title: string;
    
    @IsString()
    @IsNotEmpty({ message: '상영관을 입력해주세요.' })
    readonly theater: string;

    @IsString()
    @IsNotEmpty({ message: '날짜 및 시간을 입력해주세요.' })
    readonly date_time: string;
    
    @IsNumber()
    @IsNotEmpty({ message: '수량을 입력해주세요.' })
    readonly quantity: number;

    @IsNumber()
    @IsNotEmpty({ message: '결제금액을 입력해주세요.' })
    readonly total_price: number;
}
