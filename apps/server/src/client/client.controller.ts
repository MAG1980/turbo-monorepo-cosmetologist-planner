import { Controller, Get, HttpException } from '@nestjs/common';
import { ClientService } from '@server/client/client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('all')
  async getAllClients() {
    try {
      return await this.clientService.getAllClients();
    } catch (error) {
      throw new HttpException(
        `Something went wrong by getting all clients: ${error}`,
        500,
      );
    }
  }
}
