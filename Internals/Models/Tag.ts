import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag extends BaseEntity {

    @PrimaryGeneratedColumn() id!: number;

    @Column({ type: "varchar", length: 20 })
    guildId!: string;

    @Column({ type: "varchar", length: 20 })
    author!: string;

    @Column() title!: string;

    @Column() text!: string;

    @Column() updatedAt!: Date;

}