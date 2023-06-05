export const validateTextNormal = (text) =>{
  return /^[^\!\@\#\$\%\^\&\*\)\(\'\:\;\~]+$/.test(text)
}