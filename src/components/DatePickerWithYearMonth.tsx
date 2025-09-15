import * as React from "react"
import { format, setYear, setMonth } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerWithYearMonthProps {
  date?: Date
  onSelect?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: (date: Date) => boolean
}

export function DatePickerWithYearMonth({
  date,
  onSelect,
  placeholder = "เลือกวันที่",
  className,
  disabled
}: DatePickerWithYearMonthProps) {
  const [month, setCurrentMonth] = React.useState<Date>(date || new Date())

  const currentYear = new Date().getFullYear()
  const minYear = currentYear - 91 // Based on insurance age limit
  const maxYear = currentYear - 1   // At least 1 year old

  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  ).reverse()

  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ]

  const handleYearChange = (year: string) => {
    const newMonth = setYear(month, parseInt(year))
    setCurrentMonth(newMonth)
  }

  const handleMonthChange = (monthIndex: string) => {
    const newMonth = setMonth(month, parseInt(monthIndex))
    setCurrentMonth(newMonth)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-popover border shadow-[var(--shadow-medium)]" align="start">
        <div className="flex items-center justify-between p-3 border-b bg-muted/30">
          <Select
            value={month.getMonth().toString()}
            onValueChange={handleMonthChange}
          >
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border shadow-[var(--shadow-medium)]">
              {months.map((monthName, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {monthName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={month.getFullYear().toString()}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-20 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border shadow-[var(--shadow-medium)] max-h-60">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year + 543} {/* Thai Buddhist year */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          month={month}
          onMonthChange={setCurrentMonth}
          disabled={disabled}
          initialFocus
          className="pointer-events-auto"
          components={{
            IconLeft: () => <ChevronLeft className="h-4 w-4" />,
            IconRight: () => <ChevronRight className="h-4 w-4" />,
          }}
        />
      </PopoverContent>
    </Popover>
  )
}