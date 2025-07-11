import { useApi } from '~/composables/useApi'

export const useCategories = () => {
    const { api } = useApi()

    const getMainCategories = () => {
        let filter = [
            '{"k": "is_deleted", "o": "=", "v": false}',
            '{"k": "parent_code", "o": "=", "v": null}'
        ];
        return api.get(`categories`, {
            params: {
                filter: (filter),
                limit: 11,
                orderBy: [
                    '{"k": "sequence", "v": "asc"}',
                    '{"k": "name", "v": "asc"}',
                ],

                //with: ["images"]
            }
        })
    }

    return { getMainCategories }
} 