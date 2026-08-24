import { Skeleton } from './ui/skeleton';

// Skeleton genérico usado enquanto as várias secções (Anúncios, Fotos,
// Oráculo) carregam dados da API. Mantém a mesma "forma" de um cartão real
// (ícone + linhas de texto) para que o layout não salte quando os dados
// chegam.
export function CardSkeleton() {
  return (
    <div className="overflow-hidden border border-slate-200 rounded-xl p-6">
      <div className="flex items-start space-x-4">
        <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function CardSkeletonGrid({
  count = 6,
  className = 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6',
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={className} aria-hidden="true" aria-label="A carregar conteúdo">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
