import SuggestionPageSearch from "@/components/SuggestionPageSearch";

export default function SuggestionPage() {
  return (
    <>
      <div className="bg-base-100">
        <div className="container mx-auto min-h-screen px-8">
          <div className="grid w-full place-items-center pt-2 text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-wider">
              Leave the Browsing to Us
            </h1>
            <p className="text-base md:text-2xl font-medium mt-1">
              AI-Powered Recommendations for Every Mood
            </p>
          </div>
          <SuggestionPageSearch />
        </div>
      </div>
    </>
  );
}
