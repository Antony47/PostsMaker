import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User"

@Entity()
export class Post extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar'
    })
    email!: string;

    @Column({
        type: 'varchar'
    })
    title!: string;

    @Column({
        type: 'varchar'
    })
    content!: string;

    @CreateDateColumn()
    createdDate!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @Column({default: false})
    edit!: boolean

    @ManyToOne(() => User, (user) => user.posts)
    user!: User
}