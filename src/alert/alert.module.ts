import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './alert.entity';
import { CommanModule } from 'src/comman/comman.module';

@Module({
  imports: [TypeOrmModule.forFeature([Alert]), CommanModule],
  providers: [AlertService],
  controllers: [AlertController],
  exports: [AlertService]
  
})
export class AlertModule {}
