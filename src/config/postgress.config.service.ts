import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgressConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: '127.0.0.1',
            port: 5432,
            username: 'root',
            password: 'root',
            database: 'loja',
            entities: [],
            synchronize: true,
        };
    }
}
