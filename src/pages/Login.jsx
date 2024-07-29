import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //for password show
  const [showPassword, setShowPassword] = useState(false);

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  //toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to={"/password/forgot"}
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              {/* <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              /> */}
              <div style={{ position: "relative", display: "flex" }}>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your Password"
                  style={{ paddingRight: "60px" }}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    border: "none",
                    background: "none",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {loading ? (
              <SpecialLoadingButton content={"Loggin In"} />
            ) : (
              <Button
                type="submit"
                onClick={() => handleLogin(email, password)}
                className="w-full"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/images/login.png"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
