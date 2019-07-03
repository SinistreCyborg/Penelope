import { Entity, BaseEntity, Column, ManyToOne } from "typeorm";
import { Guild } from "../..";

@Entity()
export class Case extends BaseEntity {

    @Column() id!: number;

    @Column({ nullable: true }) reason!: string;

    @Column({ type: "varchar", length: 20 })
    userID!: string;

    @ManyToOne(() => Guild, guild => guild.cases)
    guild!: Guild;

}