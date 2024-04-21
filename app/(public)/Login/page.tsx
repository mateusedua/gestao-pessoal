'use client'

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { useState } from 'react';
import { LockKeyhole, LockKeyholeOpen } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
    email: z
        .string()
        .min(1, "E-mail Obrigatório")
        .email("E-mail Inválido"),
    password: z
        .string()
        .min(1, "Senha Obrigatória")

})

const Login = () => {

    const [open, setOpen] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
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
                                        <Input placeholder='Senha ...' {...field} type={open ? 'text' : 'password'} className='h-[50px] text-md' />
                                        <Button variant='ghost'
                                            size='icon'
                                            type='button'
                                            className='absolute hover:bg-transparent left-[88%]'
                                            onClick={() => setOpen(!open)}
                                        >
                                            {open ? <LockKeyholeOpen /> : <LockKeyhole />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-end hover: '>
                        <Link href='/Cadastro'>Cadastrar-se ?</Link>
                    </div>
                    <Button variant='default' type='submit' className='text-md h-[50px]'>
                        Entrar
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default Login