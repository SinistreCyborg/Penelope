import { Entity, BaseEntity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Guild extends BaseEntity {

    @PrimaryColumn({ type: "varchar", length: 20 })
    id!: string;

    @Column() prefix!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    modLogs!: string;

}