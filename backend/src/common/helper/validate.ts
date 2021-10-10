export function validateEmail(mail: string) {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
  return pattern.test(mail)

}
