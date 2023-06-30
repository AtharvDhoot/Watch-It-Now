// const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;

// const { GoogleAuth } = require("google-auth-library");

// async function givePrompt() {
//   const MODEL_NAME = "models/text-bison-001";
//   const PALM_API_KEY = process.env.PALM_API_KEY;

//   const client = new TextServiceClient({
//     authClient: new GoogleAuth().fromAPIKey(PALM_API_KEY),
//   });

//   const prompt = "Repeat after me: one, two,";

//   return await client.generateText({
//     model: MODEL_NAME,
//     prompt: {
//       text: prompt,
//     },
//   });
// }

export default async function Home() {
  // const data = await givePrompt();
  // console.log(data[0].candidates[0].output);

  return (
    <>
      <main className="bg-base-100">
        <div className="container mx-auto h-[84vh]">hi</div>
      </main>
    </>
  );
}
