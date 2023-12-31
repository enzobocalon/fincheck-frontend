import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import useLoginController from "./useLoginController";
import Button from "../../components/Button";

export default function Login() {
  const { register, handleSubmit, errors, isLoading } = useLoginController();
  return (
    <div>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Entre em sua conta</h1>

        <p className="space-x-1">
          <span className="text-gray-700 tracking-[-0.5px]"> Novo por aqui? </span>

          <Link to="/register" className="tracking-[-0.5px] font-medium text-teal-900">
            Crie sua conta
          </Link>
        </p>
      </header>
      <form className="mt-[60px] flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Entrar
        </Button>
      </form>
    </div>
  )
}
