import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';

@Module({
    // estou importando um outro modulo no app.module o modulo raiz
    imports: [UsuarioModule, ProdutoModule],
})
export class AppModule {}
