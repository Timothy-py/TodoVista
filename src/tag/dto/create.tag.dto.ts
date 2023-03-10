import { IsNotEmpty, IsString } from "class-validator";

export class CreateTagDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;
}