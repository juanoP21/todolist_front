import {jwtDecode} from "jwt-decode"; // Asegúrate de importar correctamente jwt-decode

interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export const getLoginInfo = (): UserInfo | null => {
  //metodo para obtener el token del usuario
  if (typeof window !== "undefined") { // Verifica si estás en el cliente
    const token = localStorage.getItem("token");
    if (token) {
      const userInfo: UserInfo = jwtDecode(token);
      return userInfo;
    }
  }
  return null;
};
