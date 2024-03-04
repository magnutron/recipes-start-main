import { Route, Routes } from "react-router-dom";
import { Categories } from "./recipes/Categories";
import Recipe from "./recipes/Recipe";
// import Recipes from "./recipes/RecipeList";
import RecipesLayout from "./recipes/RecipesLayout";
import RecipeForm from "./recipes/RecipeForm";
import Login from "./security/Login";
import Logout from "./security/Logout";
import Layout from "./Layout";
import Home from "./Home";
import Contact from "./Contact";
import "./App.css";
import RequireAuth from "./security/RequireAuth";

export default function App() {
  //const auth = useAuth();
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/" element={<Categories />} />
        <Route path="/recipes" element={<RecipesLayout />}>
          <Route path="test" element={<h1>Test</h1>} />
          <Route path=":id" element={<Recipe />} />
        </Route>
        <Route
          path="/add"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <RecipeForm />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="*"
          element={
            <>
              <h2>Not Found</h2>
              <p>I will not make this more fancy</p>
            </>
          }
        />
        {/* <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    </Layout>
  );
}
