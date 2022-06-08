import axios from "axios";

import { Person } from "../types";
import errorHandle from "./error-handler";

namespace PersonAPI {
  const api = axios.create({ baseURL: `${import.meta.env.VITE_APP_API_URL}/person` });

  export const getAll = async () => {
    const { data } = await errorHandle(api.get<Array<Person>>("/"));
    return data;
  };

  export const get = async (id: number) => {
    const { data } = await errorHandle(api.get<Person>("/", { params: { person_id: id } }));
    return data;
  };

  export const create = async (person: Person) => {
    const formData = new FormData();
    formData.append("id", `${person.id}` ?? "");
    formData.append("first_name", person.first_name);
    formData.append("last_name", person.last_name);
    formData.append("age", `${person.age}`);
    formData.append("address", person.address);
    formData.append("gender", person.gender);
    formData.append("occupation", person.occupation);

    const { data } = await errorHandle(
      api.post<string>("/", formData, { headers: { "Content-Type": "multipart/form-data" } })
    );
    return alert(data);
  };

  export const update = async (person: Person) => {
    const { data } = await errorHandle(api.post<string>("/", person));
    return alert(data);
  };

  export const remove = async (id: number) => {
    const { data } = await errorHandle(api.delete<string>("/", { params: { person_id: id } }));
    return alert(data);
  };
}

export default PersonAPI;
