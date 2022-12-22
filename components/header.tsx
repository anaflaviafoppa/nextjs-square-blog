import Image from 'next/image';
import Container from './container';

export default function Header() {
  return (
      <nav>
          <Container>
              <Image
                  width={120}
                  height={52}
                  alt={`Logo Bom de Beer`}
                  src='/images/logo.png'
              />
          </Container>
      </nav>
    /*<h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href="/" className="hover:underline">
        Blog
      </Link>
      .
    </h2>*/
  )
}
