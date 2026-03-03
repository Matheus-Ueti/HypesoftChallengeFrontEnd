import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { Button }   from '@/components/ui/button'
import { Input }    from '@/components/ui/input'
import { Label }    from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Category } from '@/types/category'

const schema = z.object({
  name:        z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface CategoryFormProps {
  defaultValues?: Partial<Category>
  onSubmit: (data: FormData) => void
  onClose: () => void
}

const errorCls = 'border-red-300 focus-visible:ring-red-200'

export const CategoryForm = ({ defaultValues, onSubmit, onClose }: CategoryFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:        defaultValues?.name        ?? '',
      description: defaultValues?.description ?? '',
    },
  })
  
  const isEditing = !!defaultValues?.id

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" className={errors.name ? errorCls : ''} {...register('name')} />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea id="description" rows={2} {...register('description')} />
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
