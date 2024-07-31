import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgressConfigService } from './config/postgress.config.service';

@Module({
    // estou importando um outro modulo no app.module o modulo raiz
    imports: [
        UsuarioModule,
        ProdutoModule,
        TypeOrmModule.forRootAsync({
            useClass: PostgressConfigService,
            inject: [PostgressConfigService],
        }),
    ],
})
export class AppModule {}
