import { LUKSO_IPFS_BASE_URL } from '@/constants/links';
import CodeEditor from '../CodeEditor';

type VerifiableURIViewerProps = {
  value: any; // JSON object
};

const VerifiableURIViewer: React.FC<VerifiableURIViewerProps> = ({ value }) => {
  if (!value) {
    return <span className="help">No data found for this key.</span>;
  }

  return (
    <>
      <CodeEditor sourceCode={JSON.stringify(value, null, 4)} readOnly={true} />

      <span>
        URL:
        <code className="ml-2">{value.url}</code>
      </span>
      {value.url && value.url.indexOf('ipfs://') !== -1 && (
        <>
          <a
            className="has-text-link button is-small is-light is-info"
            target="_blank"
            rel="noreferrer"
            href={`${LUKSO_IPFS_BASE_URL}/${value.url.replace('ipfs://', '')}`}
          >
            Retrieve IPFS File ↗️
          </a>
        </>
      )}
    </>
  );
};

export default VerifiableURIViewer;
