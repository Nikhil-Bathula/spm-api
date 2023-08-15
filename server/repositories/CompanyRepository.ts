import { PrismaClient } from "@prisma/client";

export class CompanyRepository {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async findCompanyByDomain(domain: string) {
        let domain_parsed: string[] = domain.split("@");
        let domain_parsed_i : string = domain_parsed[1];
        console.log(`DOMAIN PARSED 12 : ${domain_parsed[0]}`);
        console.log(`DOMAIN PARSED 13 : ${domain_parsed_i}`);
        domain_parsed_i=="gmail.com" ? domain_parsed_i = "google.com" : domain_parsed_i = domain_parsed_i;
        domain_parsed_i=="outlook.com" ? domain_parsed_i = "microsoft.com" : domain_parsed_i = domain_parsed_i;
        console.log(`DOMAIN PARSED : ${domain_parsed_i}`)
        const company = await this.prisma.company.findFirst({
            where : {
                domain : {endsWith : domain_parsed_i}
            }, select: {
                id : true
            }
        });
        let company_id: number = 0;
        company ?  company_id = company.id : 1

        console.log(`COMPANY : ${company_id}`)
        return company_id;

    }

}