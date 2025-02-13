import { Type } from '@nestjs/common';

interface Flavoring<FlavorT> {
  _type?: FlavorT;
}

export type HabitdewId<Flavor extends string> = string & Flavoring<Flavor>;

export declare type DeepPartial<T> =
  | T
  | (T extends Array<infer U>
      ? DeepPartial<U>[]
      : T extends Map<infer K, infer V>
        ? Map<DeepPartial<K>, DeepPartial<V>>
        : T extends Set<infer M>
          ? Set<DeepPartial<M>>
          : T extends Type
            ? {
                [K in keyof T['prototype']]?: DeepPartial<T['prototype'][K]>;
              }
            : // eslint-disable-next-line @typescript-eslint/ban-types
              T extends object
              ? {
                  [K in keyof T]?: DeepPartial<T[K]>;
                }
              : T);
