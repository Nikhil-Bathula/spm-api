import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const createCompany = async () => {

    await prisma.company.create({
        data: {
            id: 1,
            name: "SPM",
            country: "Canada",
            domain: "spm.ca",
            industry: "Technology",
        }
    }).then(obj => {
        console.log(`COMPANY CREATED : ${obj.id}`)
    })
}

const createProject = async () => {
    await prisma.project.create({
        data: {
            id : 1,
            name: "SPM API",
            description: "Backend for SPM",
            company_id: 1,
            estimated_date_of_completion: new Date("2022-08-19"),
        }
    })
}

const createUser = async () => {
    await prisma.user.create({
        data: {
            id: 1,
            email: "codingoptimists@outlook.com",
            name: "Noob46",
            company_id: 1,
            password: "secure123",
        }
    })
    console.log(`USER CREATED`)
}

const createStatus = async () => {
    await prisma.status.create({
        data: {
            id:1,
            name: "Open",
            colour: "#FFAC1C",
            project_id: 1
        }
    })
}

const createTask = async () => {
    await prisma.task.create({
        data: {
            id: 1,
            name: "Set up aa Git workflow",
            description: "Set up all collaborators with the fork and commit workflow and set merge rules.",
            status_id: 1,
            project_id: 1,
            employee_id: 1,
            assigned_to: 1
        }
    })
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