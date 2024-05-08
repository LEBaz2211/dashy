import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, userId } = req.body;
    const task = await prisma.task.create({
      data: { title, userId },
    });
    return res.json(task);
  }
  return res.status(405).end();
}
