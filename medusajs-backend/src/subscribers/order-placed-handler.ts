import { SubscriberConfig, OrderService } from "@medusajs/medusa";

export const config: SubscriberConfig = {
  event: OrderService.Events.PLACED,
  context: {
    subscriberId: "order-placed-handler",
  },
};
