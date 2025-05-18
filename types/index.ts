export interface Employee {
  id: number
  employeeId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  positionId: number
  position: Position
  managerId?: number
  manager?: Employee
  subordinates: Employee[]
  path: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string
  departmentId?: number
  department?: Department
  metadata?: any
}

export interface Position {
  id: number
  title: string
  level: number
  parentId?: number
  parent?: Position
  children: Position[]
  description?: string
  isExecutive: boolean
  employees: Employee[]
  createdAt: string
  updatedAt: string
}

export interface Department {
  id: number
  name: string
  code: string
  description?: string
  headId?: number
  head?: Employee
  employees: Employee[]
  createdAt: string
  updatedAt: string
}

export interface User {
  id: number
  username: string
  password: string
  email: string
  employeeId?: number
  employee?: Employee
  roles: Role[]
  isActive: boolean
  lastLogin?: string
  createdAt: string
  updatedAt: string
}

export interface Role {
  id: number
  name: string
  description?: string
  users: User[]
  permissions?: any
  createdAt: string
  updatedAt: string
}

export interface AuditLog {
  id: number
  action: string
  entityType: string
  entityId?: number
  userId?: number
  user?: User
  oldData?: any
  newData?: any
  ipAddress?: string
  userAgent?: string
  createdAt: string
}

export interface ApiToken {
  id: number
  token: string
  refreshToken?: string
  userId: number
  user: User
  expiresAt: string
  isActive: boolean
  description?: string
  createdAt: string
  updatedAt: string
}

// Helper types for the UI
export interface EmployeeNode {
  id: number
  employeeId: string
  name: string
  title: string
  department: string
  departmentCode: string
  email: string
  phone?: string
  isActive: boolean
  managerId?: number
  img: string
  children: EmployeeNode[]
}

export interface DepartmentWithCount extends Department {
  employeeCount: number
}

export interface PositionWithCount extends Position {
  employeeCount: number
}
