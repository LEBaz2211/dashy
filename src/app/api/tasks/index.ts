import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const tasks = await prisma.task.findMany();
      return res.json(tasks);
    default:
      return res.status(405).end();
  }
}
