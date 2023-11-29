import { EyeIcon } from "../../../components/icons/EyeIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import AccountCard from "./AccountCard";
import AccountsSliderNavigation from "./AccountsSliderNavigation";

export default function Accounts() {
  return (
    <div className="bg-teal-900 flex flex-col rounded-2xl w-full h-full md:p-10 px-4 py-8">
      <div>
        <span className="tracking-[-0.5px] text-white">Saldo total</span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">R$ 1000,00</strong>
          <button className="flex items-center justify-center w-8 h-8">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={2.1}
          >
            <div slot="container-start" className="flex items-center justify-between">
              <strong className="text-white tracking-[-1px] text-lg">
                Minhas contas
              </strong>

              <AccountsSliderNavigation />
            </div>

            <div className="mt-4">

              <SwiperSlide>
                <AccountCard balance={1000.23} color="#7950F2" name="Nubank" type="CASH" />
              </SwiperSlide>
              <SwiperSlide>
                <AccountCard balance={1000.23} color="#7950F2" name="Nubank" type="INVESTMENT" />
              </SwiperSlide>
              <SwiperSlide>
                <AccountCard balance={1000.23} color="#7950F2" name="Nubank" type="CHECKING" />
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
      </div>
    </div >
  )
}
