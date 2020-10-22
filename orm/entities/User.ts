import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User", { schema: "koa_test" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("varchar", { name: "name", length: 25 })
  name?: string;

  @Column("varchar", { name: "phone", nullable: true, length: 11 })
  phone?: string | null;

  @Column("varchar", { name: "addr", nullable: true, length: 50 })
  addr?: string | null;
}
