import { Table, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Table()
export class User {
    @PrimaryColumn("int", { generated: true })
    id: number;

    @Column("text")
    namel: string;
    @Column("text")
    email: string;
}