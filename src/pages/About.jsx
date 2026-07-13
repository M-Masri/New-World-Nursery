function About() {
  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold text-emerald-800">من نحن</h1>
      <p className="leading-relaxed text-gray-600">
        هذه صفحة مثال توضح كيفية استخدام React Router مع هيكل المجلدات
        المطلوب. يمكنك إضافة صفحات جديدة في مجلد{' '}
        <code className="rounded bg-emerald-100 px-2 py-1 text-sm text-emerald-800">
          src/pages
        </code>{' '}
        وربطها في ملف التوجيه.
      </p>
    </section>
  )
}

export default About
