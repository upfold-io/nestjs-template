import { Global, Module, Provider } from '@nestjs/common';

import { SecurityService } from './services/security.service';

const providers: Provider[] = [SecurityService];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class SharedModule {}
