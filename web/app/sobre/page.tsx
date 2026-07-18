import { getSobre } from '@/lib/strapi';
import { mediaUrl, picsumFallback } from '@/lib/strapi';

export const dynamic = 'force-dynamic';

export default async function SobrePage() {
  const sobre = await getSobre();
  const foto =
    mediaUrl(sobre?.foto_marina ?? null) ??
    picsumFallback('marina-retrato-sobre', 900, 1100);

  const timeline = [...(sobre?.timeline ?? [])].sort((a, b) => a.ano - b.ano);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="aspect-[4/5] max-w-md mx-auto overflow-hidden rounded-sm mb-10">
        <img src={foto} alt="Marina" className="w-full h-full object-cover" />
      </div>

      <h1 className="font-serif text-4xl text-center mb-12">Sobre mim</h1>

      {timeline.length === 0 ? (
        <p className="text-ink-soft text-center">Nenhum item</p>
      ) : (
        <ol className="relative border-l border-cream-dark ml-4 space-y-10">
          {timeline.map((e) => (
            <li key={e.id} className="pl-6 relative">
              <span className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-terracota" />
              <div className="font-serif text-2xl text-terracota">{e.ano}</div>
              <h3 className="font-serif text-xl mt-1">{e.titulo}</h3>
              {e.descricao && (
                <p className="text-ink-soft mt-2 leading-relaxed">
                  {e.descricao}
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
