import { Entity, BaseEntity, Column } from "typeorm";

@Entity()
export class Case extends BaseEntity {

    @Column() id!: number;

    @Column({ nullable: true }) reason!: string;

    @Column({ type: "varchar", length: 20 })
    userID!: string;

    @Column({ type: "varchar", length: 20 })
    guildID!: string;

}