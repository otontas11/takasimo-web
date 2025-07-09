// Categories API methods
import {useApi} from "~/composables/api/useApi";

export const useCategories = () => {
    const {api} = useApi()

    const getMainCategories = () => {
        const filter = [
            '{"k": "is_deleted", "o": "=", "v": false}',
            '{"k": "parent_code", "o": "=", "v": null}'
        ]

        const orderBy = [
            '{"k": "sequence", "v": "asc"}',
            '{"k": "name", "v": "asc"}'
        ]

        return api.get('categories', {
            filter,
            limit: 11,
            orderBy
        })
    }

    return {getMainCategories}

}
