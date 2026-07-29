import aboutKids from '../assets/about-kids.webp'
import heroKids from '../assets/hero-kids.webp'
import logo from '../assets/logo.png'

const DEFAULT_AUTHOR = {
  name: 'New World Nursery',
  role: 'Educators & Care Team',
  bio: 'A warm, play-based nursery in Al Barsha. We share gentle tips, classroom moments, and guidance for families growing with us.',
  avatar: logo,
}

/**
 * Static blog posts — no API yet.
 */
export const blogPosts = [
  {
    id: 1,
    slug: 'a-happy-start-to-nursery-life',
    title: 'A Happy Start to Nursery Life',
    excerpt:
      'How we help little ones settle into Al Barsha with calm routines, warm educators, and close parent partnership.',
    content: [
      'Starting nursery is a big step for every family. At New World Nursery in Al Barsha, we ease the transition with gentle settling sessions, familiar routines, and educators who take time to know each child.',
      'Play-based learning, outdoor moments, and clear communication with parents help little ones feel safe — and grow with confidence from day one.',
      'We invite you to visit, meet the team, and see how a warm welcome can make all the difference.',
    ],
    heading: 'Settling with calm and care',
    quote:
      'A gentle first goodbye can grow into a confident hello — when children feel safe, curious, and known.',
    tags: ['Settling In', 'Families', 'Al Barsha'],
    image: aboutKids,
    category: 'Settling In',
    publishedAt: '2026-07-26',
    readMinutes: 3,
    author: DEFAULT_AUTHOR,
  },
  {
    id: 2,
    slug: 'learning-through-play-why-it-matters',
    title: 'Learning Through Play: Why It Matters',
    excerpt:
      'Play is how young children explore, invent, and make sense of the world — and it sits at the heart of our day.',
    content: [
      'When children play, they practise language, problem-solving, friendship, and curiosity. Our classrooms are designed so every corner invites discovery — blocks, stories, sand, music, and outdoor adventures.',
      'Educators observe, guide, and extend play rather than interrupt it. That is how confidence and joy take root.',
      'Come and see play in action on a nursery tour — we would love to show you around.',
    ],
    heading: 'Play with purpose',
    quote:
      'Play is not a break from learning — it is how little minds learn best.',
    tags: ['Learning', 'Play', 'Classrooms'],
    image: heroKids,
    category: 'Learning',
    publishedAt: '2026-07-18',
    readMinutes: 4,
    author: DEFAULT_AUTHOR,
  },
  {
    id: 3,
    slug: 'a-day-in-our-classrooms',
    title: 'A Day in Our Classrooms',
    excerpt:
      'From morning greetings to story time and outdoor play — a gentle look at how our days unfold.',
    content: [
      'Mornings begin with warm welcomes and free play, so each child arrives at their own pace. Then we gather for songs, stories, and shared moments.',
      'Afternoons mix focused activities with rest, outdoor time, and creative exploration. Every rhythm is flexible enough for little needs.',
      'Parents receive updates that celebrate small wins — because every day holds something worth sharing.',
    ],
    heading: 'Rhythm of the day',
    quote:
      'Every day holds something worth sharing — a first friendship, a new word, a brave try.',
    tags: ['Daily Life', 'Routine', 'Stories'],
    image: aboutKids,
    category: 'Daily Life',
    publishedAt: '2026-07-10',
    readMinutes: 3,
    author: DEFAULT_AUTHOR,
  },
  {
    id: 4,
    slug: 'partnering-with-parents',
    title: 'Partnering With Parents',
    excerpt:
      'Strong home–nursery relationships help children feel secure. Here is how we stay close to families.',
    content: [
      'We believe parents are a child’s first teachers. Open doors, honest conversations, and regular updates keep everyone on the same page.',
      'From settling visits to progress chats, we listen as much as we share — because trust grows both ways.',
      'If you have questions about joining our community, reach out or book a tour. We are happy to help.',
    ],
    heading: 'Growing trust together',
    quote:
      'Parents are a child’s first teachers — and we are honoured to walk beside them.',
    tags: ['Families', 'Partnership', 'Trust'],
    image: heroKids,
    category: 'Families',
    publishedAt: '2026-07-02',
    readMinutes: 3,
    author: DEFAULT_AUTHOR,
  },
  {
    id: 5,
    slug: 'outdoor-play-sunshine-and-curiosity',
    title: 'Outdoor Play, Sunshine & Curiosity',
    excerpt:
      'Fresh air, messy play, and nature moments help little bodies and minds stretch every day.',
    content: [
      'Our outdoor spaces invite climbing, digging, water play, and quiet watching. Sunshine and shade both have a place in the rhythm of the day.',
      'Educators stay close, narrating discoveries and keeping everyone safe while children lead the adventure.',
      'Ask us about outdoor learning on your next visit — we love showing families around the garden.',
    ],
    heading: 'Learning under the sky',
    quote:
      'Sunshine, shade, and muddy hands — outdoor play is where curiosity runs free.',
    tags: ['Outdoors', 'Nature', 'Play'],
    image: aboutKids,
    category: 'Outdoors',
    publishedAt: '2026-06-24',
    readMinutes: 3,
    author: DEFAULT_AUTHOR,
  },
  {
    id: 6,
    slug: 'mealtimes-that-feel-like-home',
    title: 'Mealtimes That Feel Like Home',
    excerpt:
      'Shared tables, gentle routines, and colourful plates turn lunch into a calm social moment.',
    content: [
      'Mealtimes are more than fuel. They are chances to practise manners, try new tastes, and chat with friends.',
      'We keep the atmosphere unhurried so children can listen to their hunger and enjoy company.',
      'Parents are always welcome to ask about menus and how we support picky eaters with patience.',
    ],
    heading: 'Around the table',
    quote:
      'A shared table teaches more than tasting — it teaches belonging.',
    tags: ['Care', 'Mealtimes', 'Routine'],
    image: heroKids,
    category: 'Care',
    publishedAt: '2026-06-16',
    readMinutes: 2,
    author: DEFAULT_AUTHOR,
  },
  {
    id: 7,
    slug: 'celebrating-small-wins-together',
    title: 'Celebrating Small Wins Together',
    excerpt:
      'First friendships, new words, and brave tries — we notice the little milestones that matter.',
    content: [
      'Progress in the early years often looks quiet: a longer goodbye, a shared toy, a new song remembered.',
      'We celebrate those moments with children and share them with families so everyone feels the growth.',
      'Every child moves at their own pace — and that is exactly how it should be.',
    ],
    heading: 'Noticing what matters',
    quote:
      'The smallest win can light up a whole day — for a child, and for their family.',
    tags: ['Growth', 'Milestones', 'Joy'],
    image: aboutKids,
    category: 'Growth',
    publishedAt: '2026-06-08',
    readMinutes: 3,
    author: DEFAULT_AUTHOR,
  },
]

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) ?? null
}

export function formatBlogDate(isoDate) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}

export function formatBlogDateShort(isoDate) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}

export function formatTimeAgo(isoDate) {
  const then = new Date(isoDate).getTime()
  if (Number.isNaN(then)) return ''
  const days = Math.max(0, Math.floor((Date.now() - then) / 86400000))
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months === 1) return '1 month ago'
  return `${months} months ago`
}
