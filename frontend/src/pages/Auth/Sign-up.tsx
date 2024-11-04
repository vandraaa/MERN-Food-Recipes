import { useState } from "react";
import Container from "../../components/container/Container";
import InputWithLabel from "../../components/form/inputWithLabel";
import Button from "../../components/form/button";
import { signUpUser } from "./lib/service";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const register = async () => {
    setLoading(true);
    try {
      const response = await signUpUser(formData.name, formData.email, formData.password);

      if (response?.status === 201) {
        console.log(response);
        navigate("/sign-in");
      } else {
        toast.error(response?.error.message);
      }
    } catch (err) {
      toast.error("Something went wrong, try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-200 flex justify-center items-center">
      <Container>
        <ToastContainer position="top-right" autoClose={3000} />
        
        <div className="w-[100%] sm:w-[80%] xl:w-[60%] mx-auto bg-white px-4 py-12 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-600">
              Sign Up
            </h1>
            <div className="mt-8 px-6 w-full space-y-3 md:space-y-4 lg:space-y-6">
              <InputWithLabel
                labelText="Name"
                inputType="text"
                placeholder="Enter your name"
                value={formData.name}
                name="name"
                onChange={handleChange}
              />
              <InputWithLabel
                labelText="Email"
                inputType="email"
                placeholder="Enter your email"
                value={formData.email}
                name="email"
                onChange={handleChange}
              />
              <InputWithLabel
                labelText="Password"
                inputType="password"
                placeholder="Enter your password"
                value={formData.password}
                name="password"
                onChange={handleChange}
              />
              <div className="pt-4">
                <Button onClick={register}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
              </div>
              <div className="mt-6 text-center">
                <p className="text-[10px] sm:text-sm lg:text-base font-medium text-gray-600">
                  Already have an account? Sign in{" "}
                  <Link to={"/sign-in"} className="text-sky-600">here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
