import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export interface CategoryChartData {
  categoria: string
  produtos: number
}

interface CategoryChartProps {
  data: CategoryChartData[]
}
const truncate = (label: string, max = 12) =>
  label.length > max ? label.slice(0, max) + '…' : label

export const CategoryChart = ({ data }: CategoryChartProps) => {
  const many = data.length > 5

  return (
    <ResponsiveContainer width="100%" height={many ? 260 : 220}>
      <BarChart
        data={data}
        barSize={many ? 16 : 28}
        margin={{ bottom: many ? 40 : 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis
          dataKey="categoria"
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          angle={many ? -35 : 0}
          textAnchor={many ? 'end' : 'middle'}
          interval={0}
          tickFormatter={(v) => truncate(v)}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
          cursor={{ fill: '#f8fafc' }}
        />
        <Bar dataKey="produtos" fill="#6366f1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
