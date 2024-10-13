import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceService } from './price/price.service';
import { PriceModule } from './price/price.module';
import { SwapModule } from './swap/swap.module';
import { AlertModule } from './alert/alert.module';
import { SchedularModule } from './schedular/schedular.module';
import { CommanModule } from './comman/comman.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedularService } from './schedular/schedular.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres', // or 'mysql', 'sqlite', etc.
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'], // Add your entities here
    synchronize: true, // Set to false in production
  }),PriceModule, SwapModule, AlertModule, SchedularModule, CommanModule],
  controllers: [AppController],
  providers: [AppService, SchedularService],
})
export class AppModule {}
