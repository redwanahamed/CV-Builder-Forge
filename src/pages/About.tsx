
import Header from "@/components/layout/Header";

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-6">About CV Forge AI</h1>
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg mb-6">
              At CV Forge AI, we're revolutionizing the way professionals create and manage their resumes. 
              Our AI-powered platform combines cutting-edge technology with professional expertise to help 
              you craft the perfect resume for your dream job.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-secondary/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p>
                Leveraging the latest in AI technology to provide smart, 
                personalized resume suggestions and improvements.
              </p>
            </div>
            <div className="bg-secondary/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Expertise</h3>
              <p>
                Built on insights from HR professionals and hiring managers 
                across various industries.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-lg mb-6">
              Founded in 2024, CV Forge AI emerged from a simple observation: 
              creating a professional resume shouldn't be a daunting task. 
              Our team of AI specialists and career experts came together to 
              build a platform that makes resume creation intuitive and effective.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
