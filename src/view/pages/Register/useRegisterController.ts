import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { authService } from '../../../app/services/authService';
import { SignupParams } from '../../../app/services/authService/signup';
import { toast } from 'react-hot-toast'
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um E-mail válido'),
  password: z.string()
    .min(8, 'Senha é obrigatória')
});

type FormData = z.infer<typeof schema>

export default function useRegisterController() {
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
    mutationKey: ['signup'],
    mutationFn: async (data: SignupParams) => {
     return authService.signup(data);
    }
  })

  const { signin } = useAuth()

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signin(accessToken)
    } catch (e) {
      toast.error('Ocorreu um erro ao criar sua conta')
    }
  })

  return {
    handleSubmit,
    register,
    isLoading,
    errors
  }
}

