import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { keccak256 } from 'web3-utils';

const Lsp4MetadataEncoderPage: NextPage = () => {
  const [images, setImages] = useState<
    {
      name: string;
      type: string;
      hash: string;
      buffer: Buffer;
      image?: string;
    }[]
  >([]);

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <input className="input mb-2" type="text" placeholder="name" />
          <textarea
            className="textarea is-fullwidth"
            placeholder="description"
          />
        </div>
        <div className="column is-quarter">
          <div className="file has-name is-right is-fullwidth">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="resume"
                onChange={async (event) => {
                  if (event.target.files?.length) {
                    const file = event.target.files[0];
                    const { name, type } = file;
                    const arrayBufferFile = await file.arrayBuffer();
                    const buffer = Buffer.from(arrayBufferFile);
                    const hash = keccak256(`0x${buffer.toString('hex')}`);

                    let image;
                    if (type.startsWith('image/')) {
                      image = `data:${type};base64,${buffer.toString(
                        'base64',
                      )}`;
                    }

                    setImages([...images, { name, type, hash, buffer, image }]);
                  }
                }}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose a file…</span>
              </span>
              <span className="file-name">
                Screen Shot 2017-07-29 at 15.54.25.png
              </span>
            </label>
          </div>
        </div>
      </div>

      {images.map(({ hash, image }) =>
        image ? <img key={hash} src={image} height={10} /> : <></>,
      )}
    </div>
  );
};

export default Lsp4MetadataEncoderPage;
