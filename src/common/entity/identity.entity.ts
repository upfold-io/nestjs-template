import { Exclude, Expose } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { IIdentity } from '@common/interfaces';

import { CoreEntity } from './core.entity';

export class Identity extends CoreEntity<Identity> implements IIdentity {
  @ApiProperty()
  id: string;

  @Exclude()
  salt: string;

  @ApiProperty()
  email_address: string;

  @Exclude()
  password: string;
}
