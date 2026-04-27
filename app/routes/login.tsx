import { Form, useActionData, useNavigation, redirect, Link } from "react-router";
import { getSession, sessionStorage, hashPassword } from "../utils/auth.server";
import type { Route } from "./+types/login";

export async function action({ request, context }: Route.ActionArgs) {
  const db = context.cloudflare.env.DB;
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const redirectTo = formData.get("redirectTo")?.toString() || "/";

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const hashedPassword = await hashPassword(password);
  
  const user = await db
    .prepare("SELECT id FROM users WHERE email = ? AND password_hash = ?")
    .bind(email, hashedPassword)
    .first();

  if (!user) {
    return { error: "Invalid email or password" };
  }

  const session = await getSession(request);
  session.set("userId", user.id);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export default function Login() {
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-[#f6f6f3] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-sm border border-[#e5e5e0] p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#e60023] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">K</div>
          <h1 className="text-2xl font-bold text-[#211922]">Welcome Back</h1>
          <p className="text-[#62625b] mt-2">Sign in to Keen PSLE</p>
        </div>

        {actionData?.error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-[12px] mb-6 text-sm">
            {actionData.error}
          </div>
        )}

        <Form method="post" className="space-y-4">
          <input type="hidden" name="redirectTo" value="/" />
          
          <div>
            <label className="block text-sm font-medium text-[#211922] mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              required 
              className="w-full px-4 py-3 bg-[#f6f6f3] border border-[#e5e5e0] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#e60023]"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#211922] mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              required 
              className="w-full px-4 py-3 bg-[#f6f6f3] border border-[#e5e5e0] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#e60023]"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3 bg-[#e60023] text-white rounded-full font-semibold hover:bg-[#ad081b] transition-colors disabled:opacity-70 mt-4"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </Form>
        
        <div className="mt-6 text-center text-sm text-[#62625b]">
          Don't have an account? <Link to="/register" className="text-[#e60023] hover:underline font-semibold">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
