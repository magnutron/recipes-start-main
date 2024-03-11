import { Link, NavLink } from "react-router-dom";
import AuthStatus from "./security/AuthStatus";
import { useAuth } from "./security/AuthProvider";

export default function NavHeader() {
  const auth = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/categories">Categories</NavLink>
        </li>
        <li>
          <NavLink to="/recipes">Recipes</NavLink>
        </li>
        {auth.isLoggedIn() && (
          <li>
            <NavLink to="/add">Add Recipe</NavLink>
          </li>
        )}
        {auth.isLoggedInAs(["ADMIN"]) && (
          <li>
            <NavLink to="/add-category">Add Category</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <AuthStatus />
      </ul>
    </nav>
  );
}
