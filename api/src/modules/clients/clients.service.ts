import { ConflictException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from 'src/shared/database/repositories/client.repositories';

@Injectable()
export class ClientsService {
  constructor(private readonly clientsRepo: ClientRepository) {}

  async create(createClientDto: CreateClientDto) {
    const clientExists = await this.clientsRepo.findUnique({
      where: { name: createClientDto.name },
    });
    if (clientExists) {
      throw new ConflictException('Nome de cliente já existe!');
    }

    return await this.clientsRepo.create({ data: createClientDto });
  }

  async findAll() {
    console.log('Caiu aqui');
    return await this.clientsRepo.findMany({});
  }

  async findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  async remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
