import { GitbookSvg } from '@/components/icons/GitbookSvg'

export const GitbookLink = () => (
  <a
    href="https://kyotofoundation.gitbook.io/kyotoprotocol/introduction/introduction"
    className="rounded-md bg-primary p-2"
    title="Gitbook"
    target="_blank"
    rel="noopener"
  >
    <div className="text-white w-5 h-5 flex items-center">
      <GitbookSvg />
    </div>
  </a>
)
