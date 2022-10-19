import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import {Post} from "./Post"

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar'
    })
    email!: string;

    @Column({
        type: 'varchar'
    })
    password!: string;

    @Column({
        nullable:true,
        type: "int"})
    age!: number | null;

    @CreateDateColumn()
    createdDate!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @OneToMany(() => Post, (post) => post.email) // note: we will create author property in the Photo class below
    posts?: Post[]

}