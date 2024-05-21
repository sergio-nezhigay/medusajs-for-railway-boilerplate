//// src/admin/widgets/HelloWorldWidget.tsx

//import type { OrderDetailsWidgetProps, WidgetConfig } from "@medusajs/admin";
//import { useEffect, useState } from "react";

//const HelloWorldWidget = ({ order }: OrderDetailsWidgetProps) => {
//  const [message, setMessage] = useState("");
//  console.log("🚀 ~ message:", message);

//  useEffect(() => {
//    const fetchMessage = async () => {
//      try {
//        const response = await fetch(`/admin/custom`);
//        if (!response.ok) {
//          throw new Error("Network response was not ok");
//        }
//        const data = await response.json();
//        setMessage(data.message);
//      } catch (error) {
//        console.error("Fetch error: ", error);
//      }
//    };

//    fetchMessage();
//  }, [order.id]);
//  return (
//    <div className="bg-white p-8 border border-gray-200 rounded-lg">
//      <h1>HelloWorldWidget</h1>
//      <h1>message: {message}</h1>
//    </div>
//  );
//};

//export const config: WidgetConfig = {
//  zone: "order.details.before",
//};

//export default HelloWorldWidget;
