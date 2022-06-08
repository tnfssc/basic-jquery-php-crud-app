import "./style.css";
import $ from "jquery";
import personStore from "./store/person";
import { Person } from "./types";

const createTr = ({ person }: { person: Person }) => {
  return `
    <tr>
      <td>${person.id}</td>
      <td>${person.first_name}</td>
      <td>${person.last_name}</td>
      <td>${person.age}</td>
      <td>${person.address}</td>
      <td>${person.gender}</td>
      <td>${person.occupation}</td>
      <td>${new Date(person.created_at!).toLocaleString("en-IN")}</td>
      <td>
        <button id="${`${person.id}-edit-btn`}">Edit</button>
        <button id="${`${person.id}-remove-btn`}">Remove</button>
      </td>
    </tr>
  `;
};

await personStore.fetch();
personStore.getState().forEach(person => {
  $("#personstable").append(createTr({ person }));
  $(`#${person.id}-remove-btn`).on("click", () => {
    personStore.remove(person.id!);
  });
  $(`#${person.id}-edit-btn`).on("click", () => {
    $("input[name=first_name]").val(person.first_name);
    $("input[name=last_name]").val(person.last_name);
    $("input[name=age]").val(person.age);
    $("input[name=address]").val(person.address);
    $("select[name=gender]").val(person.gender);
    $("input[name=occupation]").val(person.occupation);
    $("input[name=id]").val(`${person.id}`);
  });
});

$("#formsubmit").on("click", async e => {
  e.preventDefault();
  const person: Person = {
    first_name: $("input[name=first_name]").val() as string,
    last_name: $("input[name=last_name]").val() as string,
    age: parseInt($("input[name=age]").val() as string),
    address: $("input[name=address]").val() as string,
    gender: $("select[name=gender]").val() as string,
    occupation: $("input[name=occupation]").val() as string,
  };
  // determines if new or old
  const id = parseInt($("input[name=id]").val() as string);
  if (!isNaN(id)) person.id = id;
  await personStore.create(person);
});
