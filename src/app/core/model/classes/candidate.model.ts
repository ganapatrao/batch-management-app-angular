export class candidateModel {
  candidateId: number
  fullName: string
  email: string
  mobileNumber: string
  password: string
  role: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date


  constructor(){
    this.candidateId=0
    this.fullName=""
    this.email=""
    this.mobileNumber=""
    this.password=""
    this.role=""
    this.isActive=false
    this.createdAt=new Date()
    this.updatedAt= new Date()
  }
}