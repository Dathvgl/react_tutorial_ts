import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import InputTSX from "./components/Input";

type FormDataType = {
  email: string;
  password: string;
  remember: boolean;
};

function SignInPage() {
  const scheme: ZodType<FormDataType> = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember: z.boolean(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({ resolver: zodResolver(scheme) });

  function onSubmit(data: FormDataType) {
    const email = data.email;
    const password = data.password;
    const remember = data.remember;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("remember", `${remember}`);
  }

  function signUp(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
  }

  function forgotPassword(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
  }

  return (
    <>
      <div className="full-body bg-red-100 flex">
        <div className="md:flex m-auto rounded-lg shadow-xl w-4/5 md:h-4/5 overflow-hidden">
          <div className="w-full h-full md:w-2/3 max-md:py-4 bg-white center-flex">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-4/5 md:w-2/3 lg:w-1/2 text-center"
            >
              <div className="text-green-500 font-bold text-3xl">
                Sign in to Account
              </div>
              <hr className="w-12 border-4 border-green-500 rounded mx-auto my-6" />
              <InputTSX<FormDataType>
                name="email"
                label="Email"
                errors={errors}
                register={register}
              />
              <br />
              <InputTSX<FormDataType>
                name="password"
                type="password"
                label="Password"
                errors={errors}
                register={register}
              />
              <br />
              <div className="md:flex justify-between font-bold">
                <div className="hidden md:flex gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    {...register("remember")}
                  />
                  <label
                    htmlFor="remember"
                    className="cursor-default select-none"
                  >
                    Remember me
                  </label>
                </div>
                <a onClick={forgotPassword} href="">
                  Forgot Password?
                </a>
              </div>
              <input
                value="Sign In"
                type="submit"
                className="px-12 py-2 bg-green-500 text-white mt-8 rounded-3xl whitespace-nowrap font-bold cursor-pointer"
              />
              <div className="md:hidden">
                <br />
                <a onClick={signUp} className="text-blue-500 font-bold" href="">
                  Don't have an account?
                </a>
              </div>
            </form>
          </div>
          <div className="max-md:hidden w-1/3 bg-green-400 center-flex">
            <div className="text-white text-center">
              <div className="text-2xl font-bold">Hello, Friend!</div>
              <hr className="w-12 border-4 border-white rounded mx-auto my-6" />
              <div>Sign up to join us</div>
              <button
                onClick={signUp}
                className="px-12 py-2 border-2 border-white mt-8 rounded-3xl whitespace-nowrap font-bold"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
