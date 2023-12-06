import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { useState } from "react";
import { formatDate } from "../../app/utils/formatDate";
import { Popover } from "./Popover";
import DatePicker from "./Datepicker";

interface DatePickerInputProps {
  className?: string,
  error?: boolean
}

export default function DatePickerInput({ className, error }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  function handleChange(date: Date) {
    setSelectedDate(date)
  }
  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button className={cn("bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative pt-4",
            error && '!border-red-900',
            className
          )}
            type="button">
            <span className="text-gray-700 text-xs left-[13px] top-2 pointer-events-none absolute">Data</span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleChange}/>
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">
            {error}
          </span>
        </div>
      )}
    </div>
  )
}
