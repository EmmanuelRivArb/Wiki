import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/Wiki Entities/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @ManyToMany(() => User, (user) => user.roles, {
    nullable: true,
    lazy: true,
  })
  users: User[];
}
