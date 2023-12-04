import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import SliderNavigation from "./SliderNavigation";
import { SliderOptions } from "./SliderOptions";
import { useTransactionsController } from "./useTransactionsController";
import { cn } from "../../../../../app/utils/cn";
import Spinner from "../../../../components/Spinner";
import emptyStateImage from '../../../../../assets/Empty State.svg'
import TransactionTypeDropdown from "./TransactionTypeDropdown";
import FiltersModal from "./FiltersModal";

export default function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    transactions, isLoading,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal } = useTransactionsController();
  const hasTransactions = transactions.length > 0;
  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}
      {
        !isInitialLoading && (
          <>
            <FiltersModal open={isFiltersModalOpen} onClose={handleCloseFiltersModal}/>
            <header>
              <div className="flex items-center justify-between ">
                <TransactionTypeDropdown />

                <button onClick={handleOpenFiltersModal}>
                  <FilterIcon />
                </button>
              </div>

              <div className="mt-6 relative">
                <Swiper
                  slidesPerView={3}
                  centeredSlides
                >
                  <SliderNavigation />
                  {MONTHS.map((month, index) => (
                    <SwiperSlide key={month}>
                      {
                        ({ isActive }) => (
                          <SliderOptions isActive={isActive} month={month} index={index} />
                        )
                      }
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </header>

            <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
              {isLoading && (
                <div className="flex items-center justify-center flex-col h-full">
                  <Spinner className="w-10 h-10" />
                </div>
              )}
              {(!hasTransactions && !isLoading) && (
                <div className="flex items-center justify-center flex-col h-full">
                  <img src={emptyStateImage} />
                  <span className="text-gray-700">Não encontramos nenhuma transação.</span>
                </div>
              )}
              {(hasTransactions && !isLoading) && (
                <>
                  <div className="bg-white p-4 rounded-2xl flex items-center gap-4 justify-between">
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon type='expense' />

                      <div>
                        <strong className="tracking-[-0.5px] font-bold block">Almoço</strong>
                        <span className="text-gray-600 text-sm">01/01/1900</span>
                      </div>
                    </div>

                    <span className={cn("text-red-800 tracking-[-0.5px] font-medium", !areValuesVisible && 'blur-sm')}>
                      - {formatCurrency(120)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </>
        )
      }
    </div>
  )
}
