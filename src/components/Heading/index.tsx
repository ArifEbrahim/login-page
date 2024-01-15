import './Heading.module.css'

interface HeadingProps {
  text: string
}

function Heading({ text }: HeadingProps) {
  return <h1>{text}</h1>
}

export default Heading
