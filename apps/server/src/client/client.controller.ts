import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { ClientService } from '@server/client/client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('seed/:amount')
  async seedClients(@Param('amount') amount: string) {
    try {
      await this.clientService.seedClients(amount);
    } catch (error) {
      throw new HttpException(
        `Something went wrong by seeding clients: ${error}`,
        500,
      );
    }

    return 'Clients seeded!';
  }

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
