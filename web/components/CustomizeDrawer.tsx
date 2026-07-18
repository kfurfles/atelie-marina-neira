'use client';

import { useState } from 'react';
import clsx from 'clsx';
import type { CampoCustomizacao } from '@/types/strapi';
import type { CartItem } from '@/lib/whatsapp';

type Customizacao = CartItem['customizacao'];

export function CustomizeDrawer({
  open,
  onClose,
  onApply,
  camposCategoria,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  onApply: (c: Customizacao) => void;
  camposCategoria: CampoCustomizacao[];
  initial: Customizacao;
}) {
  const [state, setState] = useState<Customizacao>(initial);

  const setGlobal = (k: keyof Customizacao, v: string) =>
    setState((prev) => ({ ...prev, [k]: v }));

  const setCat = (label: string, v: string) =>
    setState((prev) => ({
      ...prev,
      categoria: { ...(prev.categoria ?? {}), [label]: v },
    }));

  return (
    <>
      <div
        onClick={onClose}
        className={clsx(
          'fixed inset-0 bg-ink/30 z-40 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      />
      <aside
        className={clsx(
          'fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 shadow-xl transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-cream-dark flex items-center justify-between">
            <h2 className="font-serif text-xl">Personalizar</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-cream-dark inline-flex items-center justify-center"
              aria-label="Fechar"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <Field label="Cor desejada">
              <input
                type="text"
                value={state.cor_desejada ?? ''}
                onChange={(e) => setGlobal('cor_desejada', e.target.value)}
                className="input"
                placeholder="Ex: verde musgo, terracota, sem preferência"
              />
            </Field>

            <Field label="Tamanho / dimensão">
              <input
                type="text"
                value={state.tamanho_preferencia ?? ''}
                onChange={(e) => setGlobal('tamanho_preferencia', e.target.value)}
                className="input"
                placeholder="Ex: pequeno, ~12cm"
              />
            </Field>

            <Field label="Acabamento">
              <select
                value={state.acabamento ?? ''}
                onChange={(e) => setGlobal('acabamento', e.target.value)}
                className="input"
              >
                <option value="">Sem preferência</option>
                <option value="fosco">Fosco</option>
                <option value="brilho">Brilho</option>
              </select>
            </Field>

            {camposCategoria.length > 0 && (
              <div className="pt-2 border-t border-cream-dark space-y-4">
                <p className="text-sm text-ink-soft">Campos específicos desta categoria</p>
                {camposCategoria.map((campo) => (
                  <Field key={campo.id} label={campo.label}>
                    {renderCampo(campo, state.categoria?.[campo.label] ?? '', (v) =>
                      setCat(campo.label, v)
                    )}
                  </Field>
                ))}
              </div>
            )}

            <Field label="Observações (opcional)">
              <textarea
                value={state.observacoes ?? ''}
                onChange={(e) => setGlobal('observacoes', e.target.value)}
                className="input min-h-[96px]"
                placeholder="Alguma preferência ou pedido especial?"
              />
            </Field>
          </div>

          <div className="border-t border-cream-dark px-6 py-4">
            <button
              onClick={() => {
                onApply(state);
                onClose();
              }}
              className="w-full bg-ink text-cream py-3 rounded hover:bg-ink-soft transition"
            >
              Salvar personalização
            </button>
          </div>
        </div>
      </aside>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #eae2d3;
          border-radius: 4px;
          background: white;
          font-size: 0.95rem;
        }
        .input:focus {
          outline: none;
          border-color: #c87456;
        }
      `}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm text-ink-soft mb-1">{label}</span>
      {children}
    </label>
  );
}

function renderCampo(
  campo: CampoCustomizacao,
  value: string,
  onChange: (v: string) => void
) {
  if (campo.tipo === 'dropdown') {
    const options = (campo.opcoes ?? '')
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);
    return (
      <select value={value} onChange={(e) => onChange(e.target.value)} className="input">
        <option value="">Selecione</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
  if (campo.tipo === 'numero') {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
    );
  }
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input"
    />
  );
}
