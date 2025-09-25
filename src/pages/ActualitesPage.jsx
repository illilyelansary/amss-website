import React from 'react'

const posts = [
  {
    title: 'Lancement d’activités WASH en milieu scolaire',
    date: '2025-04-05',
    excerpt:
      'Des actions de réhabilitation et de promotion de l’hygiène sont engagées dans plusieurs écoles des régions du nord.',
    tag: 'WASH',
  },
  {
    title: 'Formation de comités de protection communautaire',
    date: '2025-03-18',
    excerpt:
      'Les communautés se dotent de mécanismes locaux pour prévenir les risques et améliorer la prise en charge.',
    tag: 'Protection',
  },
  {
    title: 'Transferts monétaires saisonniers en appui aux ménages',
    date: '2025-02-10',
    excerpt:
      'AMSS accompagne des ménages vulnérables pour faire face à la soudure et relancer les moyens d’existence.',
    tag: 'Sécurité alimentaire',
  },
]

function NewsCard({ post }) {
  const d = new Date(post.date)
  const nice = d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return (
    <article className="rounded-2xl border p-6 bg-white shadow-sm hover:shadow-md transition">
      <div className="text-xs uppercase tracking-wide mb-1">{post.tag}</div>
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <time className="text-sm text-gray-600">{nice}</time>
      <p className="mt-3 text-sm">{post.excerpt}</p>
    </article>
  )
}

export default function ActualitesPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Actualités</h1>
        <p className="text-muted-foreground mt-2">
          Suivez l’actualité des programmes et de la vie de l’ONG AMSS.
        </p>
      </header>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <NewsCard key={p.title} post={p} />
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-6">
        Astuce : ces actualités sont stockées dans un tableau <code>posts</code>. Vous pourrez les
        lier à votre API/Headless CMS ultérieurement.
      </p>
    </section>
  )
}