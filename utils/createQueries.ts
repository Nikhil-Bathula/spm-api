import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const createCompany = async () => {


    await prisma.company.createMany({
        data: [{
            id: 1,
            name: "SPM",
            country: "Canada",
            domain: "spm.ca",
            industry: "Technology",

        },{
            id : 2,
            name : "Google",
            country: "USA",
            domain: "google.com",
            industry: "Technology"
        }, {
            id : 3,
            name : "Microsoft",
            country: "USA",
            domain: "microsoft.com",
            industry: "Technology"
        },{
            id : 4,
            name : "Conestoga",
            country: "Canada",
            domain: "conestogac.on.ca",
            industry: "Education"
        }
        ]
    }).then(obj => {
        console.log(`COMPANIES CREATED }`)
    })

    // await prisma.company.create({
    //     data: {
    //         id: 1,
    //         name: "SPM",
    //         country: "Canada",
    //         domain: "spm.ca",
    //         industry: "Technology",
    //     }
    // }).then(obj => {
    //     console.log(`COMPANY CREATED : ${obj.id}`)
    // })
}

const createProject = async () => {

    await prisma.project.createMany({
        data:[{
            id : 1,
            name: "SPM API",
            description: "Backend for SPM",
            company_id: 1,
            estimated_date_of_completion: new Date("2022-08-19"),
        },{
            id : 2,
            name: "Bard",
            description: "Google's answer to OpenAI",
            company_id: 2,
            estimated_date_of_completion: new Date("2024-08-19"),
        }, {
            id : 3,
            name: "Microsoft Loop",
            description: "Productivity App",
            company_id: 3,
            estimated_date_of_completion: new Date("2023-08-19"),
        }]
    })

    // await prisma.project.create({
    //     data: {
    //         id : 1,
    //         name: "SPM API",
    //         description: "Backend for SPM",
    //         company_id: 1,
    //         estimated_date_of_completion: new Date("2022-08-19"),
    //     }
    // })
}

const createUser = async () => {

    // await prisma.user.createMany({
    //     data: [{
    //         id: 1,
    //         email: "codingoptimists@outlook.com",
    //         name: "Noob46",
    //         company_id: 1,
    //         password: "secure123",
    //     }, {
    //         id: 2,
    //         email: "divyani.parte27@gmail.com",
    //         name: "Divyani Parte",
    //         company_id: 2,
    //         password: "MujheBhukLagiHain",
    //     }, {
    //         id: 3,
    //         email: "nikhilbathula@outlook.com",
    //         name: "Nikhil Bathula",
    //         company_id: 3,
    //         password: "DilDaMaamla",
    //     }]
    // })

    // await prisma.user.create({
    //     data: {
    //         id: 1,
    //         email: "codingoptimists@outlook.com",
    //         name: "Noob46",
    //         company_id: 1,
    //         password: "secure123",
    //     }
    // })
    console.log(`USER CREATED`)
}

const createStatus = async () => {

    await prisma.status.createMany({
        data: [{
            id:1,
            name: "Open",
            colour: "#FFAC1C",
            project_id: 1
        }, {
            id:2,
            name: "Open",
            colour: "#FFAC1C",
            project_id: 2
        }, {
            id:3,
            name: "Open",
            colour: "#FFAC1C",
            project_id: 3
        }]
    })

    // await prisma.status.create({
    //     data: {
    //         id:1,
    //         name: "Open",
    //         colour: "#FFAC1C",
    //         project_id: 1
    //     }
    // })
}

const createTask = async () => {

    await prisma.task.createMany({
        data: [{
            id: 1,
            name: "Set up a Git workflow",
            description: "Set up all collaborators with the fork and commit workflow and set merge rules.",
            status_id: 1,
            project_id: 1,
            employee_id: 1,
            assigned_to: 1
        }, {
            id: 2,
            name: "Shortlist user feedback",
            description: "Mark useful user feedback",
            status_id: 2,
            project_id: 2,
            employee_id: 2,
            assigned_to: 2
        }, {
            id: 3,
            name: "Invite Users for collaboration",
            description: "Create a workspace for collaboration",
            status_id: 3,
            project_id: 3,
            employee_id: 3,
            assigned_to: 3
        }]
    })

    // await prisma.task.create({
    //     data: {
    //         id: 1,
    //         name: "Set up aa Git workflow",
    //         description: "Set up all collaborators with the fork and commit workflow and set merge rules.",
    //         status_id: 1,
    //         project_id: 1,
    //         employee_id: 1,
    //         assigned_to: 1
    //     }
    // })
}

const createWatcher = async () => {
    await prisma.watcher.create({
        data: {
            id: 1,
            employee_id: 1,
            task_id: 1
        }
    })
}

export {createProject, createCompany, createUser, createStatus, createTask, createWatcher}