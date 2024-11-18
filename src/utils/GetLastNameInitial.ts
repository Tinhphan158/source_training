export const getLastNameInitial = (fullName: string) => {
  const names = fullName.trim().split(' ');
  const lastName = names[names.length - 1];
  return lastName.charAt(0).toUpperCase();
};
