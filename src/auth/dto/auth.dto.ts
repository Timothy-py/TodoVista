import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 9)
    password: string;
}
