export type SocialLink = {
  title: string
  href: string
  kind: 'linkedin' | 'mail' | 'github'
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    kind: 'linkedin',
  },
  {
    title: 'Mail',
    href: 'mailto:hello@example.com',
    kind: 'mail',
  },
  {
    title: 'Github',
    href: 'mailto:hello@example.com',
    kind: 'github',
  },
]
