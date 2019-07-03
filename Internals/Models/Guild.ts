import { Entity, BaseEntity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Case } from "../..";

@Entity()
export class Guild extends BaseEntity {

    @PrimaryColumn({ type: "varchar", length: 20 })
    id!: string;

    @Column() prefix!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    modLogs!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    memberLogs!: string;

    @OneToMany(() => Case, case => case.guild)
    cases!: Case[];

}