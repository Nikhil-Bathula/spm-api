import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";


    
const prisma = new PrismaClient();

export const getUsersByCompanyId  = async (req: Request, res: Response) => {
    const company_id = req.params.id;
    try {
        const verifyUser = await prisma.user.findMany({
            where: {
                company_id:parseInt(company_id),
            },
        });
        res.json(verifyUser);

    }
    catch (error) {
        console.log("ERROR : ", error)
        res.status(200).json({error: 'While fetching an error occurred.'})
    }
}

