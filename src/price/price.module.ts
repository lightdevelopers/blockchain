import { Module } from '@nestjs/common';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { CommanModule } from 'src/comman/comman.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Price]), CommanModule],
  providers: [PriceService],
  controllers: [PriceController],
  exports: [PriceService]
})
export class PriceModule {}
