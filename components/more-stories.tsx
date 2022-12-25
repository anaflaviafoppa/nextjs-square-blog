import PostPreview from './post-preview'
import UnderlinedTitle from './components/underlined-title/underlined-title';
import Container from './containers/container/container';
import Cards from './widgets/cards/cards';

export default function MoreStories({ posts }) {
  return (
    <section className="section">
    <Cards items={posts}
           title={'Posts Relacionados'}
           isEnabledSeeMore={false}
           maxPosts={3}
    />


     {/* <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map(({ node }) => (
          <PostPreview
            key={node.slug}
            title={node.title}
            coverImage={node.featuredImage}
            date={node.date}
            author={node.author}
            slug={node.slug}
            excerpt={node.excerpt}
          />
        ))}
      </div>*/}
    </section>
  )
}
