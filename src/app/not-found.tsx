import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center px-4 pt-28 sm:px-6">
      <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">Missing page</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight">We can’t find that page.</h1>
      <p className="mt-4 max-w-md text-muted-foreground">The drive is still there. This address is not on it.</p>
      <Link href="/" className="mt-8 inline-flex h-12 w-fit items-center rounded-full bg-cove px-6 text-paper">
        Back to Cove
      </Link>
    </main>
  );
}
