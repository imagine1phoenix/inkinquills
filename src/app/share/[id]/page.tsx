import { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const p = await params;
  const url = Buffer.from(p.id, 'base64url').toString('utf-8');
  
  return {
    title: 'HH Goa 2026 - Builder Card',
    description: 'Check out my official builder card for HH Goa 2026!',
    openGraph: {
      images: [url],
    },
    twitter: {
      card: 'summary_large_image',
      images: [url],
    }
  }
}

export default async function SharePage({ params }: Props) {
  const p = await params;
  const url = Buffer.from(p.id, 'base64url').toString('utf-8');
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
      <div className="max-w-[400px] w-full bg-card p-4 rounded-3xl shadow-2xl border border-card-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="HH Goa 2026 Builder Card" className="w-full h-auto rounded-2xl" />
      </div>
      
      <Link 
        href="/"
        className="bg-primary text-[#0f0a14] font-bold py-4 px-8 rounded-xl transition uppercase tracking-wider text-sm shadow-xl hover:bg-primary/90"
      >
        Make Your Own Card
      </Link>
    </main>
  );
}
