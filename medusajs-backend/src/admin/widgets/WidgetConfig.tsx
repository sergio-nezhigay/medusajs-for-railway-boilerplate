import type { OrderDetailsWidgetProps, WidgetConfig } from "@medusajs/admin";
import React, { useState } from "react";
import { useAdminUpdateOrder } from "medusa-react";

const OrderEmailUpdateWidget = ({ order }: OrderDetailsWidgetProps) => {
  const updateOrder = useAdminUpdateOrder(order.id);
  const [email, setEmail] = useState("");

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    updateOrder.mutate(
      { email },
      {
        onSuccess: ({ order }) => {
          console.log(order.email);
        },
      }
    );
  };

  return (
    <form onSubmit={handleUpdate}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Update Email</button>
    </form>
  );
};

export default OrderEmailUpdateWidget;

export const config: WidgetConfig = {
  zone: "order.details.before",
};
