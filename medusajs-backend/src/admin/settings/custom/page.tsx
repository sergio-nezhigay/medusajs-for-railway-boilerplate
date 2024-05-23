// pages/admin/custom-page.js (or wherever your custom setting page is located)

import React from "react";
import { useAdminOrders } from "medusa-react";
import type { SettingConfig } from "@medusajs/admin";
import type { SettingProps } from "@medusajs/admin";

const Orders = () => {
  const { orders, isLoading } = useAdminOrders();
  console.log("🚀 ~ orders:", orders);

  return (
    <div>
      {isLoading && <span>Loading...</span>}
      {orders && !orders.length && <span>No Orders</span>}
      {orders && orders.length > 0 && (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>{order.display_id}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const CustomSettingPage = ({ notify }: SettingProps) => {
  const handleClick = () => {
    notify.success("Success", "You clicked the button");
  };

  return (
    <>
      <h1>Custom Setting Page</h1>
      <button onClick={handleClick}>Click Me</button>
      <Orders />
    </>
  );
};

export const config: SettingConfig = {
  card: {
    label: "Custom",
    description: "Manage your custom settings",
  },
};

export default CustomSettingPage;
