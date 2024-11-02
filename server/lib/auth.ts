import bcrypt from 'bcrypt'

export function passwordHash(plainPass: string) : string {
  const salt = bcrypt.genSaltSync(12)

  return bcrypt.hashSync(plainPass, salt)
}

export function passwordVerify(plainPass: string, hashedPass: string) : boolean {
  return bcrypt.compareSync(plainPass, hashedPass)
}