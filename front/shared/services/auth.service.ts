import { User } from "@/@types/types"
import {api} from "../utils"

class AuthService {
    public async register(body: TypeRegisterSchema) {
        return await api.post<User>('auth/register', body)
    }

    public async login(body: TypeLoginSchema) {
        return await api.post<User>('auth/login', body)
    }

    public async oauthByProvider(provider: 'google' | 'yandex') {
        return await api.get<{ url: string }>(
            `auth/oauth/connect/${provider}`
        )
    }

    public async logout() {
        return await api.post('auth/logout')
    }
}

export const authService = new AuthService()