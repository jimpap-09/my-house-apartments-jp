import { Link } from "react-router-dom";

export function NotFoundPage() {

  return (
    <section className="min-h-screen bg-background px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold text-foreground">Page Not Found</h1>
      <p className="mt-4 text-muted-foreground">The page you are looking for does not exist.</p>
      <Link className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-primary-foreground" to="/">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
