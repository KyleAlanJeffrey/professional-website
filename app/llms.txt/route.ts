export async function GET() {
  const body = [
    "site: https://kylejeffrey.com",
    "name: Kyle Jeffrey",
    "description: Robotics software engineer portfolio with projects, publications, and contact details.",
    "owner: Kyle Jeffrey",
    "contact: mailto:kyle.alan.jeffrey@gmail.com",
    "preferred-citation: https://kylejeffrey.com",
    "policy: Public pages may be referenced and summarized with attribution.",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
