import { Module } from '@nestjs/common';
import { StaffController } from './Staff.controller';
import { StaffService } from './Staff.service';
import { Staff } from './Staff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Staff])],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
