import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <h1 className="font-serif text-5xl mb-4">Não encontrada</h1>
      <p className="text-ink-soft mb-8">A página ou peça que você procura não existe.</p>
      <Link href="/" className="underline hover:text-terracota">
        Voltar para o início
      </Link>
    </div>
  );
}
