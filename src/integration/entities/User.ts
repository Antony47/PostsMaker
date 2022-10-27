import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import {Post} from "./Post"
import {Role} from "../../enum/role.enum";

@Entity()
export class User{
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

    @OneToMany(() => Post, (post) => post.user) // note: we will create author property in the Photo class below
    posts?: Post[]
/*
    @Column()
    roles: Role[];*/
}
