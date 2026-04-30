export interface User{
id: string,
name: string,
role: 'admin' | 'employee',
email: string  
}
export interface AuthResponse {
  token: string;
  user: User;
}