export const normalText = (text) => {
  return text.substr(0, 1).toUpperCase() + text.substr(1).toLowerCase()
}
export const hasValidRole = (roleList, role) => {
  return roleList.includes(role);
}