import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUserService from '../../../../../modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, address, responsible_email, cnpj, responsible_name, phone } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      address,
      responsible_email,
      cnpj,
      responsible_name,
      phone,
    });
    // para não retorna a senha do usuário
    delete user.password;

    return response.json(user);
  }
}
