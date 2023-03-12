import "../../index.css";

function ScreenSignInPage() {
  return (
    <>
      <div className="full-body bg-red-100 flex">
        <div className="flex m-auto rounded-lg shadow-xl w-4/5 h-4/5 overflow-hidden">
          <div className="w-2/3 bg-white center-flex">
            <div className="w-1/2 text-center">
              <div className="text-green-500 font-bold text-3xl">
                Sign in to Account
              </div>
              <hr className="w-12 border-4 border-green-500 rounded mx-auto my-6" />
              <div className="relative">
                <input
                  type="text"
                  id="floating_outlined"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Email
                </label>
              </div>
              <br />
              <div className="relative">
                <input
                  type="password"
                  id="floating_outlined"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Password
                </label>
              </div>
              <br />
              <div className="flex justify-between font-bold">
                <div className="flex gap-2">
                  <input type="checkbox" name="" id="" />
                  <div>Remember me</div>
                </div>
                <div>Forgot Password?</div>
              </div>
              <button className="px-12 py-2 bg-green-500 text-white mt-8 rounded-3xl whitespace-nowrap font-bold">
                Sign In
              </button>
            </div>
          </div>
          <div className="w-1/3 bg-green-400 center-flex">
            <div className="text-white text-center">
              <div className="text-2xl font-bold">Hello, Friend!</div>
              <hr className="w-12 border-4 border-white rounded mx-auto my-6" />
              <div>Sign up to join chat</div>
              <button className="px-12 py-2 border-2 border-white mt-8 rounded-3xl whitespace-nowrap font-bold">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScreenSignInPage;
