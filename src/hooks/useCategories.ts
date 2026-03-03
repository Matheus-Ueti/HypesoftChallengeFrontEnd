import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { categoriesService } from '@/services/categories.service'
import { useAuthContext } from '@/contexts/AuthContext'
import type { CreateCategoryDTO, UpdateCategoryDTO } from '@/types/category'

const QUERY_KEY = 'categories'

export const useCategories = () => {
  const { isAuthenticated } = useAuthContext()
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: categoriesService.getAll,
    enabled: isAuthenticated,
  })
}

export const useCategory = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => categoriesService.getById(id),
    enabled: !!id,
  })

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCategoryDTO) => categoriesService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryDTO }) =>
      categoriesService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => categoriesService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
