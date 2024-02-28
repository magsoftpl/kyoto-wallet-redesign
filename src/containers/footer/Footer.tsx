import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faXTwitter } from "@fortawesome/free-brands-svg-icons";

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
          <FontAwesomeIcon icon={faXTwitter} className="w-4 h-4" />
        </a>
        <a
          href="https://discord.com/invite/kyotoprotocol"
          className="rounded-md bg-primary p-2"
          title="Discord"
          target="_blank"
          rel="noopener"
        >
          <FontAwesomeIcon icon={faDiscord} className="w-4 h-4" />
        </a>
      </div>
      <div className="basis-1/3 flex justify-center sm:justify-end items-center gap-2">
        BUILT BY KYOTOLABS
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>
    </div>
  );
};
