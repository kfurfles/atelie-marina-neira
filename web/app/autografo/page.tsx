import { getConfig } from '@/lib/config';
import { RichText } from '@/components/RichText';

export const dynamic = 'force-dynamic';

export default async function AutografoPage() {
  const config = await getConfig();
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl mb-8">O autógrafo</h1>
      <RichText content={config.texto_selo_autografo} />
    </div>
  );
}
