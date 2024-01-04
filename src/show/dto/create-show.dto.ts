import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateShowDto {
    @IsString()
    @IsNotEmpty({ message: '제목을 입력해주세요.' })
    readonly title: string;

    @IsString()
    @IsNotEmpty({ message: '이미지 주소를 입력해주세요.' })
    readonly image: string;
  
    @IsString()
    @IsNotEmpty({ message: '설명을 입력해주세요.' })
    readonly description: string;

    @IsString()
    @IsNotEmpty({ message: '카테고리를 입력해주세요.' })
    readonly category: string;
  
    @IsString()
    @IsNotEmpty({ message: '공연 날짜 및 시간을 입력해주세요.' })
    readonly date_time: string[];

    @IsNumber()
    @IsNotEmpty({ message: '공연 날짜 및 시간 당 좌석수를 입력해주세요.' })
    readonly seat_number: number[];
  
    @IsBoolean()
    @IsNotEmpty({ message: '공연 날짜 및 시간 당 예약가능 여부를 입력해주세요.' })
    readonly reservation: Boolean[];

    @IsString()
    @IsNotEmpty({ message: '상영관을 입력해주세요.' })
    readonly theater: string;

}
