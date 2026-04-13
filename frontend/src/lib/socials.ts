export type SocialLink = {
  title: string
  href: string
  kind: 'linkedin' | 'mail' | 'github'
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    title: 'LinkedIn',
    href: 'www.linkedin.com/in/benjaminemeth',
    kind: 'linkedin',
  },
  {
    title: 'Mail',
    href: 'benjamin.nemeth05@icloud.com',
    kind: 'mail',
  },
  {
    title: 'Github',
    href: 'https://github.com/Benni3',
    kind: 'github',
  },
]
