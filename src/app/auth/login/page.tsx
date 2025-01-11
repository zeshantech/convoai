import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm />
    </div>
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
    //     {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
    //     <h2 className="mb-4 text-xl font-bold">Sign In</h2>
    //     {/* {error && <p className="mb-4 text-red-500">Invalid credentials</p>} */}
    //     <div className="mb-4">
    //       <label className="block mb-1">Email</label>
    //       <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block mb-1">Password</label>
    //       <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded" />
    //     </div>
    //     <button type="submit" className="w-full px-3 py-2 text-white bg-blue-500 rounded">
    //       Sign In
    //     </button>
    //     <div className="mt-4 text-center">
    //       <a href="/auth/forgot-password" className="text-sm text-blue-500">
    //         Forgot Password?
    //       </a>
    //     </div>
    //     <div className="mt-4">
    //       <button type="button" onClick={() => signIn("google")} className="w-full px-3 py-2 mb-2 text-white bg-red-500 rounded">
    //         Sign in with Google
    //       </button>
    //       <button type="button" onClick={() => signIn("github")} className="w-full px-3 py-2 text-white bg-gray-800 rounded">
    //         Sign in with GitHub
    //       </button>
    //     </div>
    //     <div className="mt-4 text-center">
    //       <span>{"Don't"} have an account? </span>
    //       <a href="/auth/register" className="text-blue-500">
    //         Register
    //       </a>
    //     </div>
    //   </form>
    // </div>
  );
};

export default Login;
