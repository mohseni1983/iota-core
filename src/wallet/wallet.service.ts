import { Injectable } from "@nestjs/common";
import { AccountManager, AccountManagerOptions, CoinType, CreateAccountPayload, SecretManager } from "@iota/wallet";
import { GenerateBulkAddressesDto } from "./dtos/generate-bulk-addresses.dto";
import {Client} from '@iota/client'

@Injectable()
export class WalletService {

  client = new Client({
    nodes: ['https://iota.digiz.ir'],
    localPow: true,
  });






  secretManager:SecretManager={mnemonic:'choose smart trumpet pull doll trial album world provide sudden because can decorate impact ahead monkey trophy weasel history ivory rose rigid produce soft'}
  manager = new AccountManager({
    storagePath: './account_database',
    clientOptions: {
      nodes: ['https://iota.digiz.ir'],
      localPow: false,
/*
      networkInfo:{
        network: 'testnet'
      },
*/

      //network: 'testnet'
    },
    secretManager:this.secretManager,
    coinType:CoinType.IOTA
  })


  constructor() {
    this.client.getInfo().then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
    this.manager.listen(['NewOutput','TransactionProgress','TransactionInclusion'],(err,res)=>{
      if(err){
        console.log(err)
      }
      console.log(res)
    })
  }

  async createAccount(accountId:string){

    const account=await this.manager.createAccount({
      alias:accountId,
    })
    return account
  }

  async generateAddressForAccount(accountId:string){
    const account=await this.manager.getAccount(accountId)
    return await account.generateAddress()
  }

  async generateBulkAddressForAccount(createBulkAddressesDto:GenerateBulkAddressesDto){
    const {accountId,count}=createBulkAddressesDto
    const account=await this.manager.getAccount(accountId)
    const addresses=await account.generateAddresses(count)
    return addresses
  }

  async getAccountBalance(accountId){
    const account=await this.manager.getAccount(accountId)
    const balance=await account.getBalance()
    return balance
  }

  async getAccountAddresses(accountId:string){
    const account= await this.manager.getAccount(accountId)
    const addresses=await account.addresses()
    return addresses
  }




}
