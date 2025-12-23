import connectMongo from "@/utils/connectMongo";
import Newsletter from "@/models/newsletterModel";

/**
 * POST /api/newsletter
 * Save newsletter email to MongoDB
 */
export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ message: "Email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await connectMongo();

    // Prevent duplicate subscriptions
    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return new Response(
        JSON.stringify({ message: "You are already subscribed!" }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await Newsletter.create({ email });

    return new Response(
      JSON.stringify({ message: "Subscribed successfully 🚀" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);

    return new Response(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

