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

    @Column({ type: "varchar", length: 20, nullable: true })
    messageLogs!: string;

}