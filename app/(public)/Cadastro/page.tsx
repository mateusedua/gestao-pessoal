'use client'

import {z} from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    nome: z
    .string()
    .min(1, "Nome Obrigatório"),
    email: z
    .string()
    .min(1, "E-mail Obrigatório")
    .email("E-mail Inválido"),
    password: z
    .string()
    .min(1, "Senha Obrigatória"),
    confimadPassword: z
    .string()
    .min(1, "Confirmação Obrigatória")
}).refine(
    (values) => {
        return values.password === values.confimadPassword
    },
    {
        message: "As Senhas Devem Ser Iguais",
        path:["confimadPassword"]
    }
)

const Cadastro = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: '',
            email: '',
            password: '',
            confimadPassword: ''
        }
        
    })

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }

    return (
        <h1>Cadastro</h1>
    )
}

export default Cadastro