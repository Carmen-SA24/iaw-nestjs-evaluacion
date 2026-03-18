import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensajesModule } from './mensajes/mensajes.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { SizesModule } from './sizes/sizes.module';
import { ProductSizeModule } from './product-size/product-size.module';
import { Productos2Module } from './productos2/productos2.module';
import { TallasModule } from './tallas/tallas.module';
import { CategoriaModule } from './recambios/categoria/categoria.module';
import { PiezaModule } from './recambios/pieza/pieza.module';
import { ProveedorModule } from './recambios/proveedor/proveedor.module';
import { ProveedorSuministraPiezaModule } from './recambios/proveedor-suministra-pieza/proveedor-suministra-pieza.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: parseInt(config.get<string>('DB_PORT') || '3306', 10),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: (config.get<string>('DB_SYNC') === 'true'),
        logging: false, // evitar mostrar información sensible en logs
      }),
    }),
    MensajesModule,
    PostsModule,
    UsersModule,
    ProductsModule,
    SizesModule,
    ProductSizeModule,
    Productos2Module,
    TallasModule,
    CategoriaModule,
    PiezaModule,
    ProveedorModule,
    ProveedorSuministraPiezaModule,
    EvaluacionModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
