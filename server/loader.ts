import {
    deleteAllCompanies,
    deleteAllProjects, deleteAllStatuses,
    deleteAllTasks,
    deleteAllUsers,
    deleteAllWatchers
} from "../utils/deleteQueries";
import {
    createCompany,
    createProject,
    createStatus,
    createTask,
    createUser,
    createWatcher
} from "../utils/createQueries";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    await deleteAllWatchers()
    await deleteAllStatuses()
    await deleteAllTasks()
    await deleteAllProjects()
    await deleteAllUsers()
    await deleteAllCompanies()
    await createCompany()
    await createProject()
    await createUser()
    await createStatus()
    await createTask()
    await createWatcher()

    await prisma.project.update({
        where: {
            id: 1
        },
        data: {
            members: {
                connect: {
                    id: 1
                }
            }
        }
    })
}

main()
    .catch(err => {
       console.error(err.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })