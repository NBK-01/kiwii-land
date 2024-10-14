import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Waitlist } from "@prisma/client";
import prisma from "@/lib/prisma";

export const POST = async (request: Request) =>{
    const body: Waitlist = await request.json();
    const user = await prisma.waitlist.create({
        data:{
            email: body.email
        }
    });
    return NextResponse.json(user, {status: 201});
}
