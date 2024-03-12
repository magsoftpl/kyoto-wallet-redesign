import { VoteSvg } from '@/components/icons/VoteSvg'

interface VoteLinkProps {
  showLabel?: boolean
}

export const VoteLink = ({ showLabel }: VoteLinkProps) => (
  <a href="#" className="rounded-md bg-primary p-2" title="Vote" target="_blank" rel="noopener">
    <div className="flex gap-2">
      {showLabel && 'Voting'}
      <div className="text-white w-5 h-5 flex items-center">
        <VoteSvg />
      </div>
    </div>
  </a>
)
