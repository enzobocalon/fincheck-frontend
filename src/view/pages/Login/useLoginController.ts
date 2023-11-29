import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../app/services/authService';
import { SigninParams } from '../../../app/services/authService/signin';
import toast from 'react-hot-toast';
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um E-mail válido'),
  password: z.string()
    .min(8, 'Senha é obrigatória')
});

type FormData = z.infer<typeof schema>

export default function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: {
      errors
    }
   } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const { isLoading, mutateAsync } = useMutation({
    mutationKey: ['signin'],
    mutationFn: async (data: SigninParams) => {
     return authService.signin(data);
    }
  })

  const { signin } = useAuth()

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signin(accessToken);
    } catch (e) {
      toast.error('Credenciais inválidas')
    }
  })

  return {
    handleSubmit,
    register,
    isLoading,
    errors
  }
}
