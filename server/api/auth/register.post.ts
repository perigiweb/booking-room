import { UserRole } from '@prisma/client'
import { z } from 'zod'
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const schema = z.object({
    userEmail: z.string({message: 'Email harus diisi.'}).email({message: 'Email tidak valid.'}),
    userPassword: z.string({message: 'Kata Sandi harus diisi.'}).trim().min(8, {message: 'Kata Sandi minimal 8 karakter.'}),
    userName: z.string({message: 'Nama harus diisi.'}).trim().min(2, {message: 'Nama minimal 2 karakter.'}),
    userRole: z.nativeEnum(UserRole),
    userPhone: z.union([z.string().regex(/^[0-9]+$/, {message: 'No. Telepon hanya berupa angka.'}).nullable(), z.literal("")]).optional()
  })

  const result = await readValidatedBody(event, body => schema.safeParse(body))
  console.log(result)
  if (!result.success){
    //throw result.error.issues
    setResponseStatus(event, 422)
    return {success: false, errors: result.error.issues}
  }

  //const prisma = new PrismaClient()

  const res = await prisma.user.create({
    data: {
      email: result.data.userEmail,
      name: result.data.userName,
      phone: result.data.userPhone,
      role: result.data.userRole || UserRole.CUSTOMER,
      status: 1
    }
  })

  return {status: true, res}
})