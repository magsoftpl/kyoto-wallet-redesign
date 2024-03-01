import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { GitbookSvg } from "@/components/icons/GitbookSvg";
import { SettingsSvg } from "@/components/icons/SettingsSvg";
import { ChatSvg } from "@/components/icons/ChatSvg";
import { VoteSvg } from "@/components/icons/VoteSvg";

export const Footer = () => {
  return (
    <div className="w-full p-4 sm:flex flex-wrap justify-between bg-secondary-950 text-white font-semibold">
      <div className="basis-1/3 flex justify-center sm:justify-start items-center">
        <a href="https://kyotowallet.io" target="_blank" rel="noopener">
          KYOTOWALLET.io
        </a>
      </div>
      <div className="basis-1/3 grow flex justify-center items-center gap-2">
        <a
          href="https://twitter.com/KyotoRefi"
          title="Twitter"
          target="_blank"
          rel="noopener"
        >
          <FontAwesomeIcon icon={faXTwitter} className="w-5 h-4" />
        </a>
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
        <a
          href="#"
          className="rounded-md bg-primary p-2"
          title="Settings"
          target="_blank"
          rel="noopener"
        >
          <div className="text-white w-5 h-5 flex items-center">
            <SettingsSvg />
          </div>
        </a>
        <a
          href="#"
          className="rounded-md bg-primary p-2"
          title="Ask away"
          target="_blank"
          rel="noopener"
        >
          <div className="text-white w-5 h-5 flex items-center">
            <ChatSvg />
          </div>
        </a>
        <a
          href="#"
          className="rounded-md bg-primary p-2"
          title="Vote"
          target="_blank"
          rel="noopener"
        >
          <div className="text-white w-5 h-5 flex items-center">
            <VoteSvg />
          </div>
        </a>
      </div>
      <div className="basis-1/3 flex justify-center sm:justify-end items-center gap-2">
        BUILT BY KYOTOLABS
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>
    </div>
  );
};
