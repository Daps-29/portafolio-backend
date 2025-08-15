import { IsString } from 'class-validator'

export class ParamIdDto {
  @IsString()
  id: string
}

export class ParamsIdsDto {
  ids: any
}
