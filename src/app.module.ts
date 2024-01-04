import Joi from 'joi';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShowModule } from './show/show.module';
import { Show } from './show/entities/show.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ReserveModule } from './reserve/reserve.module';
import { HistoryModule } from './history/history.module';
import { SeatsModule } from './seats/seats.module';
import { Seat } from './seats/entities/seat.entity';
import { Reserve } from './reserve/entities/reserve.entity';
import { History } from './history/entities/history.entity';
import { AuthMiddleware } from './middleware/auth/auth.middleware';
import { ShowController } from './show/show.controller';
import { AdminMiddleware } from './middleware/admin/admin.middleware';
import { ReserveController } from './reserve/reserve.controller';
import { HistoryController } from './history/history.controller';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [Show, User, Seat, Reserve, History],
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        TOKENKEY: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    ShowModule, UsersModule, AuthModule, ReserveModule, HistoryModule, SeatsModule, TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ShowController);
    consumer.apply(AdminMiddleware).forRoutes({ path: 'api/show', method: RequestMethod.POST });
    consumer.apply(AuthMiddleware).forRoutes(ReserveController);
    consumer.apply(AuthMiddleware).forRoutes(HistoryController);
    consumer.apply(AuthMiddleware).forRoutes({ path: 'api/users', method: RequestMethod.GET });
  }
}
