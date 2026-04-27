import { Form, useActionData, useNavigation, redirect, Link } from "react-router";
import { getSession, sessionStorage, hashPassword } from "../utils/auth.server";
import type { Route } from "./+types/register";

export async function action({ request, context }: Route.ActionArgs) {
  const db = context.cloudflare.env.DB;
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password || password.length < 6) {
    return { error: "Valid email and password (min 6 chars) are required" };
  }

  // Check if user already exists
  const existingUser = await db
    .prepare("SELECT id FROM users WHERE email = ?")
    .bind(email)
    .first();

  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await hashPassword(password);
  
  // Insert new user
  const result = await db
    .prepare("INSERT INTO users (email, password_hash) VALUES (?, ?) RETURNING id")
    .bind(email, hashedPassword)
    .first();

  if (!result || !result.id) {
    return { error: "Failed to create user" };
  }

  // Auto-login
  const session = await getSession(request);
  session.set("userId", result.id);

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export default function Register() {
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-[#f6f6f3] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-sm border border-[#e5e5e0] p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#e60023] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">K</div>
          <h1 className="text-2xl font-bold text-[#211922]">Join Keen PSLE</h1>
          <p className="text-[#62625b] mt-2">Create an account to start exploring</p>
        </div>

        {actionData?.error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-[12px] mb-6 text-sm">
            {actionData.error}
          </div>
        )}

        <Form method="post" className="space-y-4">
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
              minLength={6}
              className="w-full px-4 py-3 bg-[#f6f6f3] border border-[#e5e5e0] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#e60023]"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3 bg-[#e60023] text-white rounded-full font-semibold hover:bg-[#ad081b] transition-colors disabled:opacity-70 mt-4"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </Form>
        
        <div className="mt-6 text-center text-sm text-[#62625b]">
          Already have an account? <Link to="/login" className="text-[#e60023] hover:underline font-semibold">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
