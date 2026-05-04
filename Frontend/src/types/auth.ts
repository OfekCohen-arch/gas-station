
export interface Worker{
  id: string;              
  firstName: string;      
  lastName: string;        
  email: string;           
  phone: string;             
  joinDate: number;    
  imgUrl?: string;
  password: string;         
  isAdmin : boolean;
  stationId: string;
  stationName: string;
}