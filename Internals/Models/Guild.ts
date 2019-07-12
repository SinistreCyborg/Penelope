import { Entity, BaseEntity, Column, PrimaryColumn } from "typeorm";
import { settings } from "../..";

@Entity()
export class Guild extends BaseEntity {

    @PrimaryColumn({ type: "varchar", length: 20 })
    id!: string;

    @Column({ default: settings.prefix }) prefix!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    modLogs!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    memberLogs!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    messageLogs!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    autorole!: string;

}