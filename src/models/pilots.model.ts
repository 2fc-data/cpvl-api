import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsCPF } from 'class-validator-cpf';

@Table({ tableName: 'pilots' })
class Pilots extends Model<Pilots> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @IsNotEmpty({ message: 'O sobrenome não pode ser vazio' })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  @IsNotEmpty({ message: 'O CPF não pode ser vazio' })
  @IsCPF({ message: 'O CPF informado não é válido' })
  cpf: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @IsNotEmpty({ message: 'O número de celular não pode ser vazio' })
  @IsMobilePhone('pt-BR', null, { message: 'O número de celular não é valido' })
  cellphone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio' })
  @IsEmail({}, { message: 'Forneça um e-mail válido' })
  email: string;
}

export default Pilots;
