import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SitesModule } from './sites/sites.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { Site } from './sites/entities/site.entity';
import { PagesModule } from './pages/pages.module';
import { Page } from './pages/entities/page.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user',
      password: 'root',
      database: 'my_db',
      entities: [Site, Page],
      synchronize: true,
    }),
    SitesModule,
    PagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
