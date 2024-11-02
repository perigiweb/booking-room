import { UserRole } from '@prisma/client'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const res = await prisma.user.count({
    where: {
      role: UserRole.ROOT
    }
  })

  return {hasRootUser: res > 0}
})