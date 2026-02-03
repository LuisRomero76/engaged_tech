import { Module } from '@nestjs/common';
import { CompraController } from './compra.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MailModule
  ],
  controllers: [CompraController],
  providers: [],
})
export class CompraModule {}
