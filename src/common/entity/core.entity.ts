import { Expose } from 'class-transformer';

export class CoreEntity<Entity> {
  constructor(partial: Partial<Entity>) {
    Object.assign(this, partial);
  }

  @Expose()
  get object(): string {
    return this.constructor.name.toLocaleLowerCase();
  }
}
