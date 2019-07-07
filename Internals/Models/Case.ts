import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Case extends BaseEntity {

    @PrimaryGeneratedColumn() id!: number;

    @Column() caseID!: number;

    @Column({ nullable: true }) reason!: string;

    @Column({ type: "varchar", length: 20 })
    userID!: string;

    @Column({ type: "varchar", length: 20 })
    guildID!: string;

}