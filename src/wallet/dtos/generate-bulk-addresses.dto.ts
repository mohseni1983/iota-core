import { ApiProperty } from "@nestjs/swagger";

export class GenerateBulkAddressesDto{
  @ApiProperty()
  accountId:string
  @ApiProperty()
  count:number
}
