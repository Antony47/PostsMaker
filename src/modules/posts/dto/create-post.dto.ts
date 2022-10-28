import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(0, 30)
  title: string;

  @IsString()
  @Length(0, 300)
  content: string;
}
