import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { UF } from "src/modules/rigs/entities/UF";

export class CreateBaseDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(UF)
    state: UF;

    @IsOptional()
    @IsUUID()
    rigId:string;
}
