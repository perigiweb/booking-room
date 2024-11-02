import { UserRole } from '@prisma/client'
import { z } from 'zod'
import prisma from '~/lib/prisma'
import { passwordVerify, passwordHash } from '../../lib/auth'

export default defineEventHandler(async (event) => {
  const schema = z.object({
    userEmail: z.string({message: 'Email harus diisi.'}).email({message: 'Email tidak valid.'}),
    userPassword: z.string({message: 'Kata Sandi harus diisi.'}).trim().min(8, {message: 'Kata Sandi minimal 8 karakter.'}),
  })

  const result = await readValidatedBody(event, body => schema.safeParse(body))

  if (!result.success){
    setResponseStatus(event, 422)
    return {success: false, errors: result.error.issues}
  }

  const user = await prisma.user.findFirst({
    where: {
      email: result.data.userEmail
    }
  })
  if ( !user){
    throw new Error(`User with email '${result.data.userEmail}' not found.`)
  }

  if ( !passwordVerify(result.data.userPassword, user.password as string)){
    throw new Error(`Email and Password does not match.`)
  }

  await setUserSession(event, {
    user: {
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,

    }
  })

  return {status: true}
})
