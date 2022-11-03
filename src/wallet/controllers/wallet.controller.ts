import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { WalletService } from "../wallet.service";
import { GenerateBulkAddressesDto } from "../dtos/generate-bulk-addresses.dto";
import { ApiProperty } from "@nestjs/swagger";

@Controller('wallet')
export class WalletController{
  constructor(
    private readonly walletService:WalletService
  ) {}

  @Get('account/create/:account_id')
  async createAccount(@Param('account_id') accountId:string){
    return await this.walletService.createAccount(accountId);
  }

  @Get('account/address/generate/:account_id')
  async generateAddressForAccount(@Param('account_id') accountId:string){
    return await this.walletService.generateAddressForAccount(accountId)
  }

  @Post('account/address/generate_bulk')
  async generateBulkAddressesForAccount(@Body() genBulkAddressDto:GenerateBulkAddressesDto){
    return await this.walletService.generateBulkAddressForAccount(genBulkAddressDto)
  }

  @Get('account/address/all/:account_id')
  async getAllAccountAddresses(@Param('account_id') accountId:string){
    return await this.walletService.getAccountAddresses(accountId)
  }

  @Get('account/balance/:account_id')
  async getAccountBalance(@Param('account_id') accountId:string){
    return await this.walletService.getAccountBalance(accountId)
  }




}
