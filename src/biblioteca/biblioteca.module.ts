import { Module } from '@nestjs/common';
import { AutorModule } from './autor/autor.module';
import { LibroModule } from './libro/libro.module';

@Module({
  imports: [AutorModule, LibroModule]
})
export class BibliotecaModule {}
