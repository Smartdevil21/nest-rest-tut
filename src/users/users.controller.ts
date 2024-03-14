import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(@Query('role') role?: 'ADMIN' | 'USER') {
        return this.usersService.findAll(role);
    }

    @Get('interns')
    findALlInterns() {
        return [];
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Post()
    createUser(
        @Body() user: { name: string; email: string; role: 'ADMIN' | 'USER' },
    ) {
        return this.usersService.create(user);
    }

    @Patch(':id')
    updateOne(@Param('id') id: string, @Body() userUpdate: []) {
        return [{ id, ...userUpdate }];
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return [{ id }];
    }
}
