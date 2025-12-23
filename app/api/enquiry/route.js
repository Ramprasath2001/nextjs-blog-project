import connectMongo from "@/utils/connectMongo";
import EnquiryModel from "@/models/enquiryModel";

export async function POST(req) {
  try {
    const { name, email, message, description } = await req.json();

    await connectMongo();

    const enquiry = {
      name,
      email,
      message,
      description, // ✅ added
    };

    await EnquiryModel.create(enquiry);

    return Response.json({ message: "Enquiry has been sent!" });
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
