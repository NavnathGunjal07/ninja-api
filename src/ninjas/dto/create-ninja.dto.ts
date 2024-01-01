import {MinLength} from 'class-validator'
export class CreateNinjaDto {
    @MinLength(4) // this is a decorator it will be added in controller and can validate if it's less than 4
    name:string
    weapon:string
}
