import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> => {
  {
    res.json({
      message: "[GET] Hello world!",
    });
  }
};
