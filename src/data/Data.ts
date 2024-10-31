export interface User{
    id: number
    name:string
    gender:string
    dateOfBirth:string
    email:string
}
export const users:User[] = [
    {
      id: 1,
      name: 'John Doe',
      gender: 'Male',
      dateOfBirth: '1990-01-01',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      gender: 'Female',
      dateOfBirth: '1992-03-15',
      email: '456 Oak St',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      gender: 'Male',
      dateOfBirth: '1988-06-21',
      email: 'mike.johnson@example.com',
    },
    {
      id: 4,
      name: 'Emily Davis',
      gender: 'Female',
      dateOfBirth: '1995-07-12',
      email: 'emily.davis@example.com',
    },
    {
      id: 5,
      name: 'Robert Brown',
      gender: 'Male',
      dateOfBirth: '1987-11-30',
      email: 'robert.brown@example.com',
    },
    {
      id: 6,
      name: 'Lisa White',
      gender: 'Female',
      dateOfBirth: '1993-02-19',
      email: 'lisa.white@example.com',
    },
    {
      id: 7,
      name: 'David Miller',
      gender: 'Male',
      dateOfBirth: '1994-09-10',
      email: 'david.miller@example.com',
    },
    {
      id: 8,
      name: 'Sarah Wilson',
      gender: 'Female',
      dateOfBirth: '1991-05-25',
      email: 'sarah.wilson@example.com',
    },
    {
      id: 9,
      name: 'Chris Lee',
      gender: 'Male',
      dateOfBirth: '1990-12-11',
      email: 'chris.lee@example.com',
    },
    {
      id: 10,
      name: 'Anna Taylor',
      gender: 'Female',
      dateOfBirth: '1989-08-17',
      email: 'anna.taylor@example.com',
    },
  ]