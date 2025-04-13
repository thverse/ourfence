// search/dto/search.dto.ts
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class SearchDto {
  @IsString()
  keyword: string;

  @IsInt()
  @Min(1)
  page: number = 1;

  @IsInt()
  @Min(1)
  limit: number = 20;
}
