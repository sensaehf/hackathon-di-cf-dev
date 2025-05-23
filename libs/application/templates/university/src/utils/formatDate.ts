import format from 'date-fns/format'

export const formatDate = (date: Date): string =>
  date ? format(new Date(date), 'dd.MM.yyyy') : ''

export const formatDateStr = (dateStr: string | undefined): string =>
  dateStr ? formatDate(new Date(dateStr)) : ''
