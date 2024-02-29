import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function borrow(req) {
  // const books = await prisma.books.findMany();
  const books = await prisma.books.findUnique({
    where: {
      id: parseInt(req['materialID'])
    }
  });
  console.log("Book to borrow: ----------------");
  console.log(books);


    switch (req['user_type']) {
      case 'Student':
        return await prisma.requests.create({
          data: borrow_bookStudent(req)
          });
      case 'Faculty':
        return await prisma.requests.create({
          data: borrow_bookFaculty(req)
          });
      case 'Staff':
        return await prisma.requests.create({
            data: borrow_bookStaff(req)
          });
      default:
        return null;
  }
  


  // console.log('book requests');
  // console.log(await prisma.bookrequest.findMany());

  // console.log(new Date().toLocaleString());

}

function borrow_bookStudent(params) {
  return {
    date: params['date'],
    borrow_date: new Date().toISOString(),
    return_date: null,
    status: 'borrow',
    type: params['type'],
    user_type: params['user_type'],
    bookRequests: {
      create: {
        book: {
          connect: {
            id: params['materialID']
          }
        }
      }
    },
    user_student: {
      create: {
        student_num: params['studentID'],
        name: params['name'],
        email: params['email'],
        department: params['department'],
        year_level: params['year_level'],
        section: params['section']
      }
    },

  }
}


function borrow_bookFaculty(params) {
  return {
    date: params['date'],
    borrow_date: new Date().toISOString(),
    return_date: null,
    status: 'borrow',
    type: params['type'],
    user_type: params['user_type'],
    bookRequests: {
      create: {
        book: {
          connect: {
            id: params['materialID']
          }
        }
      }
    },
    user_faculty: {
      create: {
        employee_num: params['employeeID'],
        name: params['name'],
        email: params['email'],
        department: params['department']
    }
    },

  }

}

function borrow_bookStaff(params) {
  return {
    date: params['date'],
    borrow_date: new Date().toISOString(),
    return_date: null,
    status: 'borrow',
    type: params['type'],
    user_type: params['user_type'],
    bookRequests: {
      create: {
        book: {
          connect: {
            id: params['materialID']
          }
        }
      }
    },
    user_staff: {
      create: {
        employee_num: params['employeeID'],
        name: params['name'],
        email: params['email'],
             }
            }

  }

}

 //   switch (params['user_type']) {
  //     case 'Student':
  //       user_student = {
  //             create: {
  //                 student_num: params['studentID'],
  //                 name: params['name'],
  //                 email: params['email'],
  //                 department: params['department'],
  //                 year_level: params['year_level'],
  //                 section: params['section']
  //             }
  //         };
        
  //     case 'Faculty':
  //       user_faculty = {
  //             create: {
  //                 employee_num: params['employeeID'],
  //                 name: params['name'],
  //                 email: params['email'],
  //                 department: params['department']
  //             }
  //         };

  //     case 'Staff':
  //       user_staff = {
  //             create: {
  //               employee_num: params['employeeID'],
  //               name: params['name'],
  //               email: params['email'],
             
  //             }
  //         };
        
  //     default:
  // }


   

// function borrow_book(params) {
//   let user_student = null;
//   let user_faculty = null;
//   let user_staff = null;

//   switch (params['user_type']) {
//       case 'Student':
//         user_student = {
//               create: {
//                   student_num: params['studentID'],
//                   name: params['name'],
//                   email: params['email'],
//                   department: params['department'],
//                   year_level: params['year_level'],
//                   section: params['section']
//               }
//           };
        
//       case 'Faculty':
//         user_faculty = {
//               create: {
//                   employee_num: params['employeeID'],
//                   name: params['name'],
//                   email: params['email'],
//                   department: params['department']
//               }
//           };

//       case 'Staff':
//         user_staff = {
//               create: {
//                 employee_num: params['employeeID'],
//                 name: params['name'],
//                 email: params['email'],
             
//               }
//           };
        
//       default:
//           throw new Error('Invalid user type');
//   }

//   return {
//       date: params['date'],
//       borrow_date: new Date().toISOString(),
//       return_date: null,
//       status: 'borrow',
//       type: params['type'],
//       user_type: params['user_type'],
//       bookRequests: {
//           create: {
//               book: {
//                   connect: {
//                       id: params['materialID']
//                   }
//               }
//           }
//       },
//       user_student: user_student,
//       user_faculty: user_faculty,
//       user_staff: user_staff,
//   };
// }