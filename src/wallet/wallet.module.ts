import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from "./controllers/wallet.controller";

@Module({
  providers: [WalletService],
  controllers:[WalletController]
})
export class WalletModule {}
