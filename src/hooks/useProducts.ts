import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productsService } from '@/services/products.service'
import { useAuthContext } from '@/contexts/AuthContext'
import type { CreateProductDTO, UpdateProductDTO } from '@/types/product'

const QUERY_KEY = 'products'

export const useProducts = () => {
  const { isAuthenticated } = useAuthContext()
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: productsService.getAll,
    enabled: isAuthenticated,
  })
}

export const useProduct = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => productsService.getById(id),
    enabled: !!id,
  })

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProductDTO) => productsService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductDTO }) =>
      productsService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => productsService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
