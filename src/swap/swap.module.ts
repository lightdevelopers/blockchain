import { Module } from '@nestjs/common';
import { SwapService } from './swap.service';
import { SwapController } from './swap.controller';
import { CommanModule } from 'src/comman/comman.module';

@Module({
  imports: [CommanModule],
  providers: [SwapService],
  controllers: [SwapController],
  exports: [SwapService]
})
export class SwapModule {}
