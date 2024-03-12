import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { GitbookLink } from '../externalApps/GitbookLink'
import { VoteLink } from '../externalApps/VoteLink'
import { ChatLink } from '../externalApps/ChatLink'

export const Footer = () => {
  return (
    <div className="w-full p-4 sm:flex flex-wrap justify-between bg-secondary-950 text-white font-semibold">
      <div className="basis-1/3 flex justify-center sm:justify-start items-center">
        <a href="https://kyotowallet.io" target="_blank" rel="noopener">
          KYOTOWALLET.io
        </a>
      </div>
      <div className="basis-1/3 grow flex justify-center items-center gap-2">
        <a href="https://twitter.com/KyotoRefi" title="Twitter" target="_blank" rel="noopener">
          <FontAwesomeIcon icon={faXTwitter} className="w-5 h-4" />
        </a>
        <GitbookLink />
        <ChatLink />
        <VoteLink />
      </div>
      <div className="basis-1/3 flex justify-center sm:justify-end items-center gap-2">
        BUILT BY KYOTOLABS
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>
    </div>
  )
}
