import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Usuarios } from "./userModel";

@Entity()
export class Reset_password {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne(() => Usuarios)
  @JoinColumn({ name: "id" })
  user: string;

  @Column()
  pin: string;

  @Column({ default: false })
  was_validated: boolean;

  @Column()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
