import { useApi } from '~/composables/api/useApi'

export const useCategoriesApi = () => {
  const { api } = useApi()

  const getMainCategories = async () => {
    try {
      const filter = ['{"k": "is_deleted", "o": "=", "v": false}', '{"k": "parent_code", "o": "=", "v": null}']

      const response = await api.get('categories', {
        filter: filter,
        limit: 11,
        orderBy: ['{"k": "sequence", "v": "asc"}', '{"k": "name", "v": "asc"}']
      })
      return response
    } catch (error) {
      console.error('getMainCategories error:', error)
      throw error
    }
  }

  const getAllCategories = async () => {
    try {
      const filter = ['{"k": "is_deleted", "o": "=", "v": false}'];

      const response = await api.get('categories', {
        filter: filter,
        limit: 100,
        orderBy: ['{"k": "sequence", "v": "asc"}', '{"k": "name", "v": "asc"}'],
        with: ['children']
      });

      return response;
    } catch (error) {
      console.error('getAllCategories error:', error);
      throw error;
    }
  }

  const getCategoryById = async (id: string) => {
    try {
      const filter = [
        '{"k": "is_deleted", "o": "=", "v": false}',
        `{"k": "id", "o": "=", "v": "${id}"}`
      ];

      const response = await api.get('categories', {
        filter: filter,
        limit: 1,
        with: ['children', 'parent']
      });

      return response;
    } catch (error) {
      console.error('getCategoryById error:', error);
      throw error;
    }
  }

  const getSubCategoriesById = async (id:any) => {
    try {
      const filter = [
        '{"k": "is_deleted", "o": "=", "v": false}',
        `{"k": "parent_code", "o": "=", "v": "${id}"}`
      ];

      const response = await api.get('categories', {
        filter: filter,
        orderBy: [
          '{"k": "sequence", "v": "asc"}',
          '{"k": "name", "v": "asc"}'
        ],
        with: ['children', 'parent']
      });

      return response;
    } catch (error) {
      console.error('getSubCategoriesById error:', error);
      throw error;
    }
  }

  return {
    getMainCategories,
    getAllCategories,
    getCategoryById,
    getSubCategoriesById
  }
}
