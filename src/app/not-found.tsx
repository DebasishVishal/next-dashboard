import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col gap-4 justify-center items-center">
      <h1 className="font-extrabold text-6xl tracking-tight">404 Not Found</h1>
      <p className="text-muted-foreground text-4xl">Could not find requested resource</p>
      <Link href="/" className="text-secondary hover:underline underline-offset-2">Return Home</Link>
    </div>
  );
}
