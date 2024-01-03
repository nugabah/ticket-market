import { IsNotEmpty, IsString } from "class-validator";

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

    @IsString()
    @IsNotEmpty({ message: '상영관을 입력해주세요.' })
    readonly theater: string;

}
