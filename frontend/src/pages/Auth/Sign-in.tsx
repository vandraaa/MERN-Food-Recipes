import { useState } from "react";
import Container from "../../components/container/Container";
import InputWithLabel from "../../components/form/inputWithLabel";
import Button from "../../components/form/button";
import { signInUser } from "./lib/service";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { signInSchema } from "./validation/validationSchema";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { toastSuccess, toastError } = useToast();
  const { loginContext } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const login = async () => {
    const validation = signInSchema.safeParse(formData);

    if (!validation.success) {
      const newErrors: { [key: string]: string[] } = { email: [], password: [] };
      validation.error.errors.forEach((error) => {
        if (!newErrors[error.path[0]].length) {
          newErrors[error.path[0]].push(error.message);
        }
      });
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await signInUser(formData.email, formData.password);

      if (response?.status === 200) {
        loginContext(response.data.data.token);
        navigate("/");
        toastSuccess("Login successful!");
      } else {
        toastError(response?.error.message);
      }
    } catch (err) {
      toastError("Something went wrong, try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-200 flex justify-center items-center">
      <Container>
        <div className="w-[100%] sm:w-[80%] xl:w-[60%] mx-auto bg-white px-4 py-12 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-600">Sign In</h1>
            <div className="mt-8 px-6 w-full space-y-3 md:space-y-4 lg:space-y-6">
              <InputWithLabel
                labelText="Email"
                inputType="email"
                placeholder="Enter your email"
                value={formData.email}
                name="email"
                onChange={handleChange}
                error={errors.email}
              />

              <InputWithLabel
                labelText="Password"
                inputType="password"
                placeholder="Enter your password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                error={errors.password}
              />

              <div className="pt-4">
                <Button onClick={login}>
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </div>
              <div className="mt-6 text-center">
                <p className="text-[10px] sm:text-sm lg:text-base font-medium text-gray-600">
                  Don't have an account? Sign up{" "}
                  <Link to={"/sign-up"} className="text-sky-600">here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
