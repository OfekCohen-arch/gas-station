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
export interface Worker{
  id: string;              
  firstName: string;      
  lastName: string;        
  email: string;           
  phone: string;             
  joinDate: number;    
  imgUrl?: string;         
  role?: 'admin' | 'employee'; 
}