import { $axios } from "@/plugins/axios";
import type { IAuth } from "@/types/auth.ts";

export default class AuthService {
  register(payload: { name: string; email: string; password: string; src: string }): Promise<IAuth> {
    return $axios.post(`register`, payload);
  }

  login({ email, password, remember_me }: { email: string; password: string; remember_me: number }): Promise<IAuth> {
    return $axios.post(`login`, {
      email,
      password,
      remember_me,
    });
  }
}
