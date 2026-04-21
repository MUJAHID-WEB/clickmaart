type AuthPageShellProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function AuthPageShell({
  title,
  description,
  children,
  footer,
}: AuthPageShellProps) {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">{title}</h2>
            {description ? (
              <p className="mt-3 text-sm text-slate-600">{description}</p>
            ) : null}
          </div>

          {children}

          {footer ? <div className="mt-8 text-center">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}
