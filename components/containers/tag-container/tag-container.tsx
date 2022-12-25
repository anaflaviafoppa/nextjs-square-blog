export default function TagContainer({ children, alignment }) {
    return <div className={"tag__container" + '-' + alignment}>{children}</div>
}
