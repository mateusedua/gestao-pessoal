'use client'

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/_components/ui/form';
import { Input } from '@/_components/ui/input';
import { Button } from '@/_components/ui/button';
import { LockKeyhole, LockKeyholeOpen } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

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
        path: ["confimadPassword"]
    }
)

const Cadastro = () => {

    const [openPassword, setOpenPassword] = useState<boolean>(false)
    const [openConfirmadPassword, setOpenConfirmadPassword] = useState<boolean>(false)

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
        <div className='flex justify-center h-[100vh] items-center p-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='flex gap-2 flex-col w-full max-w-sm'>
                    <FormField
                        control={form.control}
                        name='nome'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-md'>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder='Nome ...' {...field} className='h-[50px] text-md' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-md'>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder='E-mail ...' {...field} className='h-[50px] text-md' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-md'>Senha</FormLabel>
                                <FormControl>
                                    <div className='flex relative items-center'>
                                        <Input placeholder='Senha ...' {...field} className='h-[50px] text-md' type={openPassword ? 'text' : 'password'} />
                                        <Button variant='ghost'
                                            size='icon'
                                            type='button'
                                            className='absolute hover:bg-transparent left-[88%]'
                                            onClick={() => setOpenPassword(!openPassword)}
                                        >
                                            {openPassword ? <LockKeyholeOpen /> : <LockKeyhole />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='confimadPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-md'>Confirmação Senha</FormLabel>
                                <FormControl>
                                    <div className='flex relative items-center'>
                                        <Input placeholder='Senha ...' {...field} className='h-[50px] text-md' type={openConfirmadPassword ? 'text' : 'password'} />
                                        <Button variant='ghost'
                                            size='icon'
                                            type='button'
                                            className='absolute hover:bg-transparent left-[88%]'
                                            onClick={() => setOpenConfirmadPassword(!openConfirmadPassword)}
                                        >
                                            {openConfirmadPassword ? <LockKeyholeOpen /> : <LockKeyhole />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-end'>
                        <Link href="/Login">Login ?</Link>
                    </div>
                    <Button variant='default' type='submit' className='text-md h-[50px]'>
                        Cadastrar
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default Cadastro