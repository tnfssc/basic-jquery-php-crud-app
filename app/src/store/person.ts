import { Person } from "../types";
import PersonAPI from "../api/person";

class PersonStore {
  private loading = false;
  public isLoading() {
    return this.loading;
  }
  private state: Array<Person> = [];
  public getState() {
    return this.state;
  }
  public async fetch() {
    this.loading = true;
    this.state = await PersonAPI.getAll();
    this.loading = false;
  }
  public async remove(id: number) {
    this.loading = true;
    await PersonAPI.remove(id);
    this.loading = false;
    window.location.reload();
  }
  public async create(person: Person) {
    this.loading = true;
    await PersonAPI.create(person);
    this.loading = false;
    window.location.reload();
  }
  public async update(person_id: number, person: Person) {
    this.loading = true;
    await PersonAPI.update({ ...person, id: person_id });
    this.loading = false;
    window.location.reload();
  }
}

const personStore = new PersonStore();
export default personStore;
