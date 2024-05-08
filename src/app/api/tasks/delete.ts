import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { id } = req.body;
    const task = await prisma.task.delete({ where: { id } });
    return res.json(task);
  }
  return res.status(405).end();
}
