import { useState } from "react";
import { useAuth } from "../../../Context/authContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"
const LoginPage = () => {
  const [isLogin,setIsLogin]=useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const handleLogin = async(e) => {
    e.preventDefault();
    setIsLogin(true)
    await login({ email, password });
    setIsLogin(false)
  };
  return (
    <div className="border-transparent p-7 gap-5 max-w-sm md:max-w-md w-full relative bg-black/50 rounded-[40px] backdrop-blur-[20px] overflow-hidden">
      <div className="flex justify-center items-center mx-auto text-white text-xl font-normal font-['Poppins']">
        Welcome to CineStream
      </div>
      <div className="flex justify-center items-center mx-auto text-white text-3xl my-2 md:text-6xl font-extrabold font-['Poppins'] uppercase">
        Log in
      </div>
      <div className="mx-auto justify-start items-start gap-[27px]">
        <form
          onSubmit={handleLogin}
          className="space-y-4 flex flex-col gap-2 mx-3"
          action=""
        >
          <div>
            <input
              name="email"
              className="w-full px-3 py-2 mt-1 border-transparent bg-[#494949]/50 rounded-[9px] 
                            focus:outline-none focus:ring"
              type="email"
              placeholder="Email address"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              name="password"
              className="w-full px-3 py-2 mt-1 border-transparent bg-[#494949]/50 rounded-[9px]
                            focus:outline-none focus:ring"
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            {/* <button className='w-full py-2 bg-white text-first-blue font-light rounded-md 
                        hover:bg-second-blue hover:text-white'>Sign in with Google</button> */}
            <button
            disabled={isLogin}
              className="disabled:cursor-not-allowed w-full py-2 bg-first-blue text-white font-normal rounded-md 
                        hover:bg-white hover:text-second-blue"
            >
              {isLogin?'Logging in ...':'Login'}
            </button>
            <label className="flex justify-center items-center text-sm font-medium text-gray-300 mb-1">
              or
            </label>
            <GoogleLogin
              className="w-full py-2 bg-white text-first-blue font-light rounded-md"
              onSuccess={async(credentialResponse) => {
                setIsLogin(true)
                const decoded = jwtDecode(credentialResponse.credential)
                const { name, email, picture } = decoded
                await login({
                  email,
                  username: name,
                  image: picture,
                  isGoogleLogin: true,
                })
                setIsLogin(false)

              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
