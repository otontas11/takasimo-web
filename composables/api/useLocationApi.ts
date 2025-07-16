import {useApi} from '~/composables/api/useApi'

export const useLocationApi = () => {
    const {api} = useApi()

    const getCities = async () => {
        try {
            const response = api.get('cities', {
                filter: [JSON.stringify({ k: "is_deleted", o: "=", v: false })],
                limit:100
            })

            return response
        } catch (error) {
            console.error('getCities error:', error)
            throw error
        }
    }

    const getDistricts = async (cityCode: any) => {
        try {
            const response = api.get('districts', {
                filter: [JSON.stringify({k: "city_code", o: "=", v: cityCode})],
                per_page: 100
            })

            return response

        } catch (error) {
            console.error('getDistricts error:', error)
            throw error
        }

    }


    return {
        getCities,
        getDistricts
    }
}
