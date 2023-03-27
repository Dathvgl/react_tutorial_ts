import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import InputTSX from "./components/Input";

type FormDataType = {
  username: string;
  gender: string;
  birthday: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

function SignUpPage() {
  const scheme: ZodType<FormDataType> = z
    .object({
      username: z.string().min(3),
      gender: z.enum(["male", "female"]),
      birthday: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      passwordConfirm: z.string().min(6),
    })
    .refine((data) => data.password == data.passwordConfirm, {
      path: ["passwordConfirm"],
      message: "Password do not match",
    })
    .refine(
      ({ birthday }) => {
        const now = new Date();
        const current = new Date(birthday);
        return birthday != "" && now > current;
      },
      {
        path: ["birthday"],
        message: "Pick valid date of birth",
      }
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({ resolver: zodResolver(scheme) });

  function onSubmit(data: FormDataType) {
    const username = data.username;
    const gender = data.gender;
    const birthday = data.birthday;
    const email = data.email;
    const password = data.password;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("gender", gender);
    formData.append("birthday", birthday);
    formData.append("email", email);
    formData.append("password", password);
  }

  function signIn(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
  }

  return (
    <>
      <div className="full-body bg-red-100 flex">
        <div className="md:flex m-auto rounded-lg shadow-xl w-4/5 md:h-4/5 overflow-hidden">
          <div className="max-md:hidden w-1/3 bg-green-400 center-flex">
            <div className="text-white text-center">
              <div className="text-2xl font-bold">Hello, Friend!</div>
              <hr className="w-12 border-4 border-white rounded mx-auto my-6" />
              <div>Oh you have an account?</div>
              <button
                onClick={signIn}
                className="px-12 py-2 border-2 border-white mt-8 rounded-3xl whitespace-nowrap font-bold"
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="w-full h-full md:w-2/3 max-md:py-4 bg-white center-flex">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-4/5 md:w-2/3 lg:w-1/2 text-center"
            >
              <div className="text-green-500 font-bold text-3xl">
                Sign up an Account
              </div>
              <hr className="w-12 border-4 border-green-500 rounded mx-auto my-6" />
              <InputTSX
                name="username"
                label="Username"
                errors={errors}
                register={register}
              />
              <br />
              <div className="flex justify-between items-center gap-8">
                <div>
                  <label htmlFor="gender-male" className="flex gap-2">
                    <input
                      type="radio"
                      value="male"
                      id="gender-male"
                      className="pr-10"
                      {...register("gender")}
                    />
                    Male
                  </label>
                  <label htmlFor="gender-female" className="flex gap-2">
                    <input
                      type="radio"
                      value="female"
                      id="gender-female"
                      {...register("gender")}
                    />
                    Female
                  </label>
                  {errors.gender && (
                    <div className="text-start text-red-500">
                      {errors.gender?.message}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <InputTSX
                    name="birthday"
                    type="date"
                    label="Date of Birth"
                    errors={errors}
                    register={register}
                  />
                </div>
              </div>
              <br />
              <InputTSX
                name="email"
                label="Email"
                errors={errors}
                register={register}
              />
              <br />
              <InputTSX
                name="password"
                type="password"
                label="Password"
                errors={errors}
                register={register}
              />
              <br />
              <InputTSX
                name="passwordConfirm"
                type="password"
                label="Password Confirm"
                errors={errors}
                register={register}
              />
              <input
                value="Sign Up"
                type="submit"
                className="px-12 py-2 bg-green-500 text-white mt-8 rounded-3xl whitespace-nowrap font-bold cursor-pointer"
              />
              <div className="md:hidden">
                <br />
                <a onClick={signIn} className="text-blue-500 font-bold" href="">
                  Already have an account?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
