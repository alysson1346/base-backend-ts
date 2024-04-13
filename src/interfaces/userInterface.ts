export interface iUser{
  id:string
  name:string
  email:string
  password:string
  is_admin:boolean
  created_at:Date
}
  
export interface iUserCreate{
  name:string
  email:string
  password:string
  is_admin:boolean
  created_at?:Date
}

export interface iLogin{
  email:string
  password:string
}