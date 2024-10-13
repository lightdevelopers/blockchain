import { Module } from '@nestjs/common';
import { SchedularService } from './schedular.service';
import { PriceModule } from 'src/price/price.module';
import { AlertModule } from 'src/alert/alert.module';

@Module({
  imports: [PriceModule, AlertModule],
  providers: [SchedularService],
  exports: [SchedularService]
})
export class SchedularModule {}
