
export const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123"
  },
  {
    id: "2", 
    name: "Test User",
    email: "test@example.com",
    password: "test123"
  }
];


export function authenticateUser(email: string, password: string) {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}