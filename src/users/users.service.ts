import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'Pratik', email: 'prtk@gmail.cm', role: 'USER' },
    ];

    findAll(role?: 'ADMIN' | 'USER') {
        if (role) {
            return this.users.filter((user) => user.role === role);
        }
        return this.users;
    }

    findOne(id: number) {
        return this.users.find((user) => user.id === id);
    }

    create(user: { name: string; email: string; role: 'ADMIN' | 'USER' }) {
        const usersByHighestIds = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            ...user,
            id: usersByHighestIds[0].id + 1,
        };
        this.users.push(newUser);
        return this.users;
    }

    update(updatedUser: {
        id: number;
        name?: string;
        email?: string;
        role?: 'ADMIN' | 'USER';
    }) {
        this.users = this.users.map((user) => {
            if (user.id === updatedUser.id) {
                return { ...user, ...updatedUser };
            }
            return user;
        });

        return this.findOne(updatedUser.id);
    }
}
