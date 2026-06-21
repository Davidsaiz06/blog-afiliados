import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

export default async function Articulo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const filePath = path.join(process.cwd(), 'content', `${id}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <main className="max-w-3xl mx-auto p-8">
      
      {/* TRUCO: Inyectamos el CSS directamente aquí para que no pueda fallar */}
      <style>{`
        .prose-articulos p { color: #d1d5db; margin-bottom: 1.25rem; line-height: 1.75; }
        .prose-articulos ul { list-style-type: disc; padding-left: 1.5rem; color: #d1d5db; margin-bottom: 1.5rem; display: block; }
        .prose-articulos li { margin-bottom: 0.5rem; display: list-item; }
        .prose-articulos strong { font-weight: bold; color: white; }
        .prose-articulos a { 
          display: inline-block; 
          background-color: #f7dfa5; 
          color: #111111; 
          font-weight: 600; 
          padding: 0.6rem 1.5rem; 
          border-radius: 0.5rem; 
          text-decoration: none; 
          margin-top: 0.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .prose-articulos a:hover { background-color: #f5c041; transform: translateY(-1px); }
      `}</style>

      <Link href="/" className="text-blue-400 hover:underline mb-8 inline-block">
        ← Volver al inicio
      </Link>
      
      <h1 className="text-4xl font-bold text-white mb-2">{data.title}</h1>
      <p className="text-gray-500 mb-10">Publicado el: {data.date}</p>
      
      <div 
        className="prose-articulos"
        dangerouslySetInnerHTML={{ __html: contentHtml }} 
      />
    </main>
  );
}