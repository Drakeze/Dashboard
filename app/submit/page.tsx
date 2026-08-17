import { CharacterSubmitForm } from '@/components/character-submit-form';

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Submit a Character
          </h1>
          <p className="text-muted-foreground mt-1">
            Add your favorite TV, anime, video game, or comic character to the roster.
            Submissions are reviewed before they go live.
          </p>
        </div>

        <CharacterSubmitForm />
      </main>
    </div>
  );
}
