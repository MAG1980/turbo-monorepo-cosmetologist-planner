import { UserEntity } from '@server/user/entities/User.entity';
import { faker } from '@faker-js/faker/locale/ru';
import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '@server/user/dto/create-user.dto';
import { UpdateUserDto } from '@server/user/dto/update-user.dto';
import { GetUsersDto } from '@server/user/dto/get-users.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  async seed(usersAmount: number = 5) {
    const users: UserEntity[] = [];

    try {
      for (let i = 0; i < usersAmount; i++) {
        const user = new UserEntity();
        user.login = faker.internet.userName();
        user.name = faker.person.fullName();
        user.email = faker.internet.email();
        user.phone = faker.phone.number();
        users.push(user);
      }

      await this.save(users);
      console.log('Users seeded!');
    } catch (error) {
      throw new Error(`Something went wrong by seeding users: ${error}`);
    }
  }

  createEntity(createUserDto: CreateUserDto) {
    const entity = this.create(createUserDto);
    return this.save(entity);
  }

  findAllEntities(getUsersDto: GetUsersDto = {}) {
    const { search, email, phone } = getUsersDto;
    const queryBuilder = this.createQueryBuilder('user');
    if (search) {
      queryBuilder.andWhere(
        'user.name ILIKE :search OR user.login ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }
    if (email) {
      queryBuilder.andWhere('user.email = :email', { email });
    }
    if (phone) {
      queryBuilder.andWhere('user.phone = :phone', { phone });
    }

    return queryBuilder.getMany();
  }

  async findOneEntity(id: number) {
    const entity = await this.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`User with ID = ${id} is not found!`);
    }
    return entity;
  }

  updateEntity(id: number, updateUserDto: UpdateUserDto) {
    return this.update(id, updateUserDto);
  }

  removeEntity(id: number) {
    return this.delete(id);
  }
}
