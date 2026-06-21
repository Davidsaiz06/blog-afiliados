import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function Home() {
  // 1. Buscamos la carpeta 'content' donde guardas tus textos
  const folder = path.join(process.cwd(), 'content');
  
  // 2. Leemos todos los archivos que hay dentro
  const files = fs.readdirSync(folder);
  
  // 3. Extraemos el título, la fecha y la descripción de cada archivo
  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(folder, filename), 'utf8');
    const { data } = matter(fileContent);
    
    return {
      id: filename.replace('.md', ''), // Quitamos el .md para usarlo en la URL
      title: data.title,
      description: data.description,
      date: data.date,
    };
  });

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mt-10 mb-4 text-white">
        Recomendaciones y Chollos
      </h1>
      <p className="text-center text-gray-400 text-lg mb-12">
        Las mejores listas y guías de compra para acertar a la primera.
      </p>
      
      {/* 4. Aquí generamos las tarjetas automáticamente */}
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/articulos/${post.id}`}>
            <div className="border border-gray-800 rounded-lg p-6 hover:border-gray-500 hover:bg-gray-900 transition duration-300 cursor-pointer">
              <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
              <p className="text-gray-400 mt-2">{post.description}</p>
              <p className="text-sm text-gray-500 mt-4">Publicado el: {post.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}