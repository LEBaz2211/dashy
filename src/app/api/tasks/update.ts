import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id, completed } = req.body;
    const task = await prisma.task.update({
      where: { id },
      data: { completed },
    });
    return res.json(task);
  }
  return res.status(405).end();
}
