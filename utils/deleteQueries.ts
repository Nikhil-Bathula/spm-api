import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const deleteAllCompanies = async () => {
    await prisma.company.deleteMany().then(obj => {
        console.log(`All companies DELETED`)})
}

const deleteAllProjects = async () => {
    await prisma.project.deleteMany().then(obj => {
        console.log(`All projects DELETED`)})
}

const deleteAllUsers = async () => {
    await prisma.user.deleteMany().then(obj => {
        console.log(`All users DELETED`)})
}

const deleteAllStatuses = async () => {
    await prisma.status.deleteMany().then(does_not_matter => {
        console.log(`All statuses DELETED`)
    })
}

const deleteAllTasks = async () => {
    await prisma.task.deleteMany().then(does_not_matter => {
        console.log(`All tasks DELETED`)
    })
}

const deleteAllWatchers = async () => {
    await prisma.watcher.deleteMany().then(does_not_matter => {
        console.log(`All watchers DELETED`)
    })
}

export {deleteAllCompanies, deleteAllProjects, deleteAllUsers, deleteAllStatuses, deleteAllTasks, deleteAllWatchers}