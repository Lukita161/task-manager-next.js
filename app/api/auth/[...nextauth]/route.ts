import NextAuth from "next-auth";
import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "@/src/db";
import { CredetialsUserType } from "@/src/types";
import User from "@/src/models/User";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'email', type: 'text', placeholder: "Ingresa tu email", defaultValue: ''},
                password: {label: 'password', type: 'text', placeholder: "Ingresa tu contraseña", defaultValue: ''}
            },
            async authorize(credentials) {
                await connectDb()
                let user = null
                if(!credentials) {
                    throw new Error('Las credenciales son obligatorias')
                }
                user = await User.findOne({email: credentials.email})
                if(!user) {
                    throw new Error('Email no valido')
                }
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
                if(!isPasswordValid) {
                    throw new Error('Contraseña invalida')
                }
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login"
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }