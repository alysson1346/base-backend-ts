import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Usuarios {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  // @Column({ default: false })
  // email_is_verify: boolean;

  @Column({ default: false })
  is_admin: boolean;

  @Column({ nullable: true })
  created_at: Date;

  // @Column({ nullable: true })
  // updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
  