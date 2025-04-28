import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useTheme } from '../../context/ThemeContext'

const mdComponents: Components = {
  // Headings
  h1: ({ ...props }) => <h1 className="text-2xl font-bold mb-6" {...props} />,
  h2: ({ ...props }) => (
    <h2 className="text-xl font-semibold mb-5" {...props} />
  ),
  h3: ({ ...props }) => <h3 className="text-xl font-medium mb-4" {...props} />,
  h4: ({ ...props }) => <h4 className="text-xl font-medium mb-3" {...props} />,
  h5: ({ ...props }) => <h5 className="text-lg font-medium mb-2" {...props} />,
  h6: ({ ...props }) => (
    <h6 className="text-base font-medium mb-2" {...props} />
  ),

  // Paragraphs
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),

  // Lists
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="ml-4" {...props}>
      {children}
    </li>
  ),

  // Links & images
  a: ({ children, ...props }) => (
    <a
      className="text-blue-600 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ ...props }) => (
    <img
      className="max-w-full h-auto my-4 rounded"
      alt={props.alt}
      {...props}
    />
  ),

  // Blockquote
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic my-4"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code
  code: ({ className, children, ...props }) => {
    return (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto my-4">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    )
  },

  // Tables (requires remark-gfm)
  table: ({ children, ...props }) => (
    <table className="min-w-full table-auto mb-6 border-collapse" {...props}>
      {children}
    </table>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-200" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
  tr: ({ ...props }) => (
    <tr className="border-t" {...props}>
      {props.children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-2 text-left font-medium" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-2" {...props}>
      {children}
    </td>
  ),
}

const Markdown = ({ markdown }: { markdown: string }) => {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed', err)
    }
  }

  return (
    <div className="relative">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={`
          absolute top-2 right-2 z-10
          p-1 rounded
          transition-opacity cursor-pointer
          group
          ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}
        `}
        aria-label="Copy markdown"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy
            className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          />
        )}
        {/* Tooltip */}
        <span
          className={`
            absolute bottom-full left-1/2 transform -translate-x-1/2
            mb-1 px-2 py-1 text-xs rounded whitespace-no-wrap
            ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200'}
            opacity-0 group-hover:opacity-100 transition-opacity
            pointer-events-none
          `}
        >
          {copied ? 'Copied!' : 'Copy'}
        </span>
      </button>

      {/* The actual markdown render */}
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown
