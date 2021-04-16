import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string,
  email: string,
  password: string,
  address: string,
  responsible_email: string,
  cnpj: string,
  responsible_name: string,
  phone: string,
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password, address, responsible_email, cnpj, responsible_name, phone }: IRequest): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if(checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      address,
      responsible_email,
      cnpj,
      responsible_name,
      phone,
    });

    return user;
  }

}

export default CreateUserService;
