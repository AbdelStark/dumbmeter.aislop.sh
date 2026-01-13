import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[800px] flex-col items-start justify-center gap-4 px-4">
      <p className="text-xs uppercase tracking-widest text-muted">Not found</p>
      <h1 className="text-3xl font-black tracking-tight">This model page does not exist.</h1>
      <p className="text-sm text-muted">Head back to the dashboard and pick another model.</p>
      <Link href="/" className="dm-button dm-button-primary text-sm px-4 py-2">
        Back to dashboard
      </Link>
    </div>
  );
}
