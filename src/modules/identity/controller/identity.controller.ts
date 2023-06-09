import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { Identity } from '@common/entity';

import { CreateIdentityDto } from '../dto';
import { IIdentity } from '../interface';
import { IdentityService } from '../service';

@Controller('identities')
@ApiTags('Identities')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Get()
  @ApiOkResponse({ type: Identity, isArray: true })
  async findAll(): Promise<Identity[]> {
    const identities = await this.identityService.findAll();
    return identities.map((identity) => new Identity(identity));
  }

  @Get(':id')
  @ApiOkResponse({ type: Identity })
  @ApiParam({ name: 'id', type: String })
  public async findOne(@Param('id') id: string): Promise<IIdentity> {
    const identity = await this.identityService.findOne(id);

    if (!identity) {
      throw new NotFoundException('Identity not found');
    }

    return new Identity(identity);
  }

  @Post()
  @ApiCreatedResponse({ type: Identity })
  public async create(@Body() createIdentityDto: CreateIdentityDto): Promise<Identity> {
    const identity = await this.identityService.findOneByCondition({
      email_address: createIdentityDto.email_address,
    });

    if (identity) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        params: [{ email_address: 'Email address already exists' }],
      });
    }

    return new Identity(await this.identityService.create(createIdentityDto));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: Identity })
  public async update(@Param('id') id: string, @Body() updateIdentityDto): Promise<Identity> {
    return new Identity(await this.identityService.update(id, updateIdentityDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  public async delete(@Param('id') id: string): Promise<boolean> {
    const identity = await this.identityService.findOne(id);

    if (!identity) {
      throw new NotFoundException('Identity not found');
    }

    return false;
  }
}
