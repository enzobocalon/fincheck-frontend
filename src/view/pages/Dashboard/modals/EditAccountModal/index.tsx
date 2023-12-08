import { Controller } from "react-hook-form";
import Modal from "../../../../components/Modal";
import { TrashIcon } from "@radix-ui/react-icons";
import InputCurrency from "../../../../components/InputCurrency";
import { Input } from "../../../../components/Input";
import Select from "../../../../components/Select";
import ColorsDropdownInput from "../../../../components/ColorsDropdownInput";
import Button from "../../../../components/Button";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    errors,
    control,
    isLoading,
    isLoadingDelete,
    isDeleteModalOpen,
    closeEditAccountModal,
    register,
    handleSubmit,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteAccount}
        title=" Tem certeza que deseja excluir esta despesa?"
        description="Ao excluir a conta, também serão excluídos todos os registros de
        receita e despesas relacionados."
        onClose={handleCloseDeleteModal}
      />
    );
  }

  return (
    <Modal
      title="Editar conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Saldo Inicial
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              defaultValue={0}
              control={control}
              name="initialBalance"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={currencyStringToNumber(value)}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da conta"
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                options={[
                  {
                    value: "CHECKING",
                    label: "Conta Corrente",
                  },
                  {
                    value: "INVESTMENT",
                    label: "Investimentos",
                  },
                  {
                    value: "CASH",
                    label: "Dinheiro Físico",
                  },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
