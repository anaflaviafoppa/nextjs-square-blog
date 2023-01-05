export default function PostTitle({ children }) {
  return (
    <h1 className="big-title"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}
