import mongoose from "mongoose";

export type User = {
    name: string;
    email: string;
    password: string;
    address?: string;
};
