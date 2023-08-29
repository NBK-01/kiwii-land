import prisma from "@/lib/prisma"

// export const createWaitlist = async (emailRes: string) => {
//         try {
//             const res = await prisma.waitlist.create({
//                 data: {
//                     email: emailRes
//                 }
//             })
//             console.log(res)
//             return res
//         }   catch(error){
//             console.error("Error:", error)
//             throw error
//         }
       
    
// }
// export const createWaitlist = async (emailRes: string) => {
//     try {
//         const res = await prisma.waitlist.create({
//             data: {
//                 email: emailRes
//             }
//         })
//         console.log(res)
//         return res
//     }   catch(error){
//         console.error("Error:", error)
//         throw error
//     }
   

// }


export const createWaitlist = async (emailRes: string) => {
    try {
        const res = await fetch("http://localhost:3001/api/createWaitlist", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(emailRes),
        });

 

        
        console.log(res);

 
        return res; 
    }   catch (error) {
        console.error('Error:', error);
        throw error;
    }
}