import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { useCategories } from '@/hooks/useCategories'
import { Button }   from '@/components/ui/button'
import { Input }    from '@/components/ui/input'
import { Label }    from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Product } from '@/types/product'

const schema = z.object({
  name:        z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  price:       z.number({ message: 'Informe um preço válido' }).positive('Preço deve ser maior que zero'),
  stock:       z.number({ message: 'Informe um valor válido' }).int().min(0, 'Estoque não pode ser negativo'),
  categoryId:  z.string().min(1, 'Selecione uma categoria'),
})

type FormData = z.infer<typeof schema>

interface ProductFormProps {
  defaultValues?: Partial<Product>
  onSubmit: (data: FormData) => void
  onClose: () => void
}

const errorCls    = 'border-red-300 focus-visible:ring-red-200'
const selectBase  = 'w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring'
const selectError = 'w-full border border-red-300 rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-red-200'

const formatBRL = (cents: number) =>
  (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const parseCents = (value: string) =>
  Number(value.replace(/\D/g, ''))

export const ProductForm = ({ defaultValues, onSubmit, onClose }: ProductFormProps) => {
  const { data: categories = [] } = useCategories()

  const initialCents = defaultValues?.price ? Math.round(defaultValues.price * 100) : 0
  const [priceDisplay, setPriceDisplay] = useState(
    initialCents > 0 ? formatBRL(initialCents) : ''
  )

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:        defaultValues?.name        ?? '',
      description: defaultValues?.description ?? '',
      price:       defaultValues?.price       ?? 0,
      stock:       defaultValues?.stock       ?? 0,
      categoryId:  defaultValues?.categoryId  ?? '',
    },
  })

  const isEditing = !!defaultValues?.id

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            {isEditing ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}><X size={18} /></Button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" className={errors.name ? errorCls : ''} {...register('name')} />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              rows={2}
              className={errors.description ? errorCls : ''}
              {...register('description')}
            />
            {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                inputMode="numeric"
                placeholder="R$ 0,00"
                className={errors.price ? errorCls : ''}
                value={priceDisplay}
                onChange={(e) => {
                  const cents = parseCents(e.target.value)
                  setPriceDisplay(cents > 0 ? formatBRL(cents) : '')
                  setValue('price', cents / 100, { shouldValidate: true })
                }}
              />
              <input type="hidden" {...register('price', { valueAsNumber: true })} />
              {errors.price && <span className="text-xs text-red-500">{errors.price.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="stock">Estoque</Label>
              <Input id="stock" type="number" className={errors.stock ? errorCls : ''} {...register('stock', { valueAsNumber: true })} />
              {errors.stock && <span className="text-xs text-red-500">{errors.stock.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="categoryId">Categoria</Label>
            <select
              id="categoryId"
              className={errors.categoryId ? selectError : selectBase}
              {...register('categoryId')}
            >
              <option value="">Selecione...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <span className="text-xs text-red-500">{errors.categoryId.message}</span>}
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button type="submit">{isEditing ? 'Salvar' : 'Criar'}</Button>
          </div>

        </form>
      </div>
    </div>
  )
}
