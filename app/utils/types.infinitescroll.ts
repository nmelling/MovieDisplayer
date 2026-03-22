import type { VInfiniteScroll } from "vuetify/components";

export type LoadEvent = Parameters<
  NonNullable<InstanceType<typeof VInfiniteScroll>["$props"]["onLoad"]>
>[0];
export type DoneCallback = LoadEvent["done"];
