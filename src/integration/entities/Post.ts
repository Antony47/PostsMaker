import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn, JoinColumn
} from "typeorm";
import {User} from "./User"

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id!: number;

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
    @JoinColumn({ name: "user_id" , referencedColumnName: "id" })
    user!: User


}