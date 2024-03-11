import { useRef } from "react";
import { addCategory } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const category = useRef("");
  const navigate = useNavigate();

  async function submitNewCategory() {
    const name = category.current?.value;
    try {
      await addCategory(name);
      alert("Category added");
      navigate("/categories");
      //category.current.value = "";
    } catch (error) {
      console.log("Present the error to the user");
    }
  }

  return (
    <>
      <h2>Add Category</h2>
      <label htmlFor="name">Name</label>&nbsp;
      <input type="text" id="name" ref={category} />
      <button className="" onClick={submitNewCategory}>
        Add
      </button>
    </>
  );
}
