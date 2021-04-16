import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  // Dados adicionais do cliente
  @Column()
  address: string;

  @Column()
  responsible_email: string;
  
  @Column()
  cnpj: string;

  @Column()
  responsible_name: string;

  @Column()
  phone: string;
  // Dados adicionais do cliente
  
  @Column()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

}

export default User;
