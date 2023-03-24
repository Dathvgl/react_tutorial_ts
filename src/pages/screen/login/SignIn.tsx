import { createRef, FormEvent, useRef } from "react";
// import "";
import LoginInputTSX from "./components/Input";

function SignInPage() {
  const rememberRef = useRef<HTMLInputElement>(null);
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const formData = new FormData();
    formData.append("email", email ?? "");
    formData.append("password", password ?? "");
    formData.append("persistence", `${rememberRef.current?.checked ?? false}`);
  }

  function rememberMe(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();

    if (rememberRef.current != null) {
      rememberRef.current.checked = !rememberRef.current.checked;
    }
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
        <div className="md:flex m-auto rounded-lg shadow-xl w-4/5 h-4/5 overflow-hidden">
          <div className="w-full h-full md:w-2/3 bg-white center-flex">
            <form
              onSubmit={onSubmit}
              className="w-4/5 md:w-2/3 lg:w-1/2 text-center"
            >
              <div className="text-green-500 font-bold text-3xl">
                Sign in to Account
              </div>
              <hr className="w-12 border-4 border-green-500 rounded mx-auto my-6" />
              <LoginInputTSX ref={emailRef} label="Email" />
              <br />
              <LoginInputTSX
                ref={passwordRef}
                label="Password"
                type="password"
              />
              <br />
              <div className="md:flex justify-between font-bold">
                <div className="hidden md:flex gap-2">
                  <input ref={rememberRef} type="checkbox" name="" id="" />
                  <div
                    onClick={rememberMe}
                    className="cursor-default select-none"
                  >
                    Remember me
                  </div>
                </div>
                <a onClick={forgotPassword} href="">
                  Forgot Password?
                </a>
              </div>
              <input
                value="Sign In"
                type="submit"
                className="px-12 py-2 bg-green-500 text-white mt-8 rounded-3xl whitespace-nowrap font-bold"
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
              <div>Sign up to join chat</div>
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
