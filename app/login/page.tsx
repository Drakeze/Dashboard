import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Admin Login
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to review pending character submissions.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
