import type { OrderDetailsWidgetProps, WidgetConfig } from "@medusajs/admin";

const OrderWidget = ({ order }: OrderDetailsWidgetProps) => {
  return (
    <div className="bg-white p-8 border border-gray-200 rounded-lg">
      <h1>Order ID111: {order.id}</h1>
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "order.details.before",
};

export default OrderWidget;
