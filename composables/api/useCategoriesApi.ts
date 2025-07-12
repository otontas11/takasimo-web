import {useApi} from "~/composables/api/useApi";

export const useCategoriesApi = () => {
    const { api } = useApi()

    const getMainCategories = async () => {
        try {
            const filter = [
                '{"k": "is_deleted", "o": "=", "v": false}',
                '{"k": "parent_code", "o": "=", "v": null}'
            ]

            const response = await api.get('categories', {
                filter: filter,
                limit: 11,
                orderBy: [
                    '{"k": "sequence", "v": "asc"}',
                    '{"k": "name", "v": "asc"}'
                ]
            })
            console.log("getMainCategories",response)
            return response
        } catch (error) {
            console.error('getMainCategories error:', error)
            throw error
        }
    }

    const getAllCategories = async () => {
        try {
            const response = await api.get('categories', {
                filter: ['{"k": "is_deleted", "o": "=", "v": false}']
            })

            return response
        } catch (error) {
            console.error('getAllCategories error:', error)
            throw error
        }
    }

    const getCategoryById = async (id: string) => {
        try {
            const response = await api.get(`categories/${id}`)
            return response
        } catch (error) {
            console.error('getCategoryById error:', error)
            throw error
        }
    }

    const getSubCategories = async (parentId: string) => {
        try {
            const response = await api.get('categories', {
                filter: [
                    '{"k": "is_deleted", "o": "=", "v": false}',
                    `{"k": "parent_code", "o": "=", "v": "${parentId}"}`
                ]
            })

            return response
        } catch (error) {
            console.error('getSubCategories error:', error)
            throw error
        }
    }

    return {
        getMainCategories,
        getAllCategories,
        getCategoryById,
        getSubCategories
    }
} 