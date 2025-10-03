import Head from 'next/head';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';
import sizeOf from 'image-size';
import { keccak256 } from 'web3-utils';
import ERC725 from '@erc725/erc725.js';
import LSP4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import {
  LSP4DigitalAssetMetadataJSON,
  AssetMetadata,
  ImageMetadata,
  LinkMetadata,
  AttributeMetadata,
} from '@lukso/lsp-smart-contracts';

// components
import { AuthenticatedFormDataUploader } from '@lukso/data-provider-base';

const erc725js = new ERC725(LSP4Schema);

const gateway = 'https://api.universalprofile.cloud/api/v0/add';
const sharedKey = process.env.SHARED_KEY
  ? Buffer.from(process.env.SHARED_KEY, 'base64').toString()
  : '';

interface FileDetails {
  name: string;
  type: string;
  hash: string;
  buffer: Buffer;
}

type ImageDetails = FileDetails & {
  image: string;
  width: number;
  height: number;
};

const FileSelect = ({
  file,
  inputText,
  choose,
}: {
  file: FileDetails | undefined;
  inputText: string;
  choose: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}) => {
  return (
    <div className="file has-name is-right is-fullwidth">
      <label className="file-label">
        <input className="file-input" type="file" name="" onChange={choose} />
        <span className="file-cta">
          <span className="file-label">Choose file</span>
        </span>
        <span className="file-name">{file ? file.name : inputText}</span>
      </label>
    </div>
  );
};

const UploadedFile = ({
  file: { image, name, type },
  remove,
  addToList,
}: {
  file: FileDetails & { image?: string };
  remove: () => void;
  addToList?: () => void;
}) => {
  return (
    <div
      style={{
        width: '100%',
        padding: 0,
        margin: '20px 0px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {image ? (
        <img alt="" src={image} style={{ padding: 0, maxWidth: '50px' }} />
      ) : (
        <div style={{ maxWidth: '50px' }}>
          <p>Upload file</p>
        </div>
      )}

      <p>{name}</p>
      {addToList ? (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="button is-dark" onClick={addToList}>
            Add to list
          </button>
          <button className="button is-dark" onClick={remove}>
            Remove
          </button>
        </div>
      ) : (
        <button className="button is-dark" onClick={remove}>
          Remove
        </button>
      )}
    </div>
  );
};

const AttributeTypeSelect = ({
  selectedType,
  onChange,
}: {
  selectedType: 'string' | 'number' | 'boolean';
  onChange: (type: string) => void;
}) => {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState(selectedType);

  return (
    <div className={clsx('dropdown', isActive && 'is-active')}>
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(!isActive)}
        >
          <span>{text ? text : 'Type'}</span>
          <span className="file-icon" style={{ margin: '0 0 0 16px' }}>
            Choose file
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content" style={{ background: '#F0F0F0' }}>
          <button
            className="dropdown-item"
            style={{ border: 'none' }}
            onClick={() => (
              onChange('string'), setText('string'), setIsActive(false)
            )}
          >
            String
          </button>
          <button
            className="dropdown-item"
            style={{ border: 'none' }}
            onClick={() => (
              onChange('number'), setText('number'), setIsActive(false)
            )}
          >
            Number
          </button>
          <button
            className="dropdown-item"
            style={{ border: 'none' }}
            onClick={() => (
              onChange('boolean'), setText('boolean'), setIsActive(false)
            )}
          >
            Boolean
          </button>
        </div>
      </div>
    </div>
  );
};

const Lsp4MetadataEncoderPage: NextPage = () => {
  const dataProvider = new AuthenticatedFormDataUploader(gateway, sharedKey);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [links, setLinks] = useState<LinkMetadata[]>([{ title: '', url: '' }]);

  const [attributes, setAttributes] = useState<AttributeMetadata[]>([
    { key: '', value: '', type: '' },
  ]);

  const [icons, setIcons] = useState<ImageDetails[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<ImageDetails>();

  const [images, setImages] = useState<ImageDetails[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageDetails>();

  const [assets, setAssets] = useState<FileDetails[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<FileDetails>();

  const [uploadStatus, setUploadStatus] = useState<0 | 1 | 2>(0);
  const [verifiableUri, setVerifiableUri] = useState('');

  const eventToFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const { name, type } = file;
      const arrayBufferFile = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBufferFile);
      const hash = keccak256(`0x${buffer.toString('hex')}`);

      return { name, type, hash, buffer };
    }
  };

  const iconSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const result = await eventToFile(event);
    if (result) {
      const { name, type, hash, buffer } = result;

      if (!type.startsWith('image/')) {
        return;
      }

      const image = `data:${type};base64,${buffer.toString('base64')}`;
      const { height, width } = sizeOf(new Uint8Array(buffer));

      if (!height || !width) {
        return;
      }

      setSelectedIcon({ name, type, hash, buffer, image, width, height });
    }
  };

  const imageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const result = await eventToFile(event);
    if (result) {
      const { name, type, hash, buffer } = result;

      if (!type.startsWith('image/')) {
        return;
      }

      const image = `data:${type};base64,${buffer.toString('base64')}`;
      const { height, width } = sizeOf(new Uint8Array(buffer));

      if (!height || !width) {
        return;
      }

      setSelectedImage({ name, type, hash, buffer, image, width, height });
    }
  };

  const assetSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const result = await eventToFile(event);
    if (result) {
      const { name, type, hash, buffer } = result;

      setSelectedAsset({ name, type, hash, buffer });
    }
  };

  const upload = async () => {
    if (!sharedKey) {
      console.error('SHARED_KEY environment variable is not set');
      return;
    }

    setUploadStatus(1);

    const encodedIcons: ImageMetadata[] = [];
    for (const { buffer, width, height } of icons) {
      const { url, hash } = await dataProvider.upload(
        new Blob([new Uint8Array(buffer)]),
      );

      encodedIcons.push({
        width,
        height,
        url,
        verification: {
          method: 'keccak256(bytes)',
          data: hash,
        },
      });
    }

    const encodedImages: ImageMetadata[] = [];
    for (const { buffer, width, height } of images) {
      const { url, hash } = await dataProvider.upload(
        new Blob([new Uint8Array(buffer)]),
      );

      encodedImages.push({
        width,
        height,
        url,
        verification: {
          method: 'keccak256(bytes)',
          data: hash,
        },
      });
    }

    const encodedAssets: AssetMetadata[] = [];
    for (const asset of assets) {
      const { url, hash } = await dataProvider.upload(
        new Blob([new Uint8Array(asset.buffer)]),
      );

      encodedAssets.push({
        url,
        verification: {
          method: 'keccak256(bytes)',
          data: hash,
        },
      });
    }

    const metadata: LSP4DigitalAssetMetadataJSON = {
      LSP4Metadata: {
        name,
        description,
        links: links.filter(({ title, url }) => title && url),
        attributes: attributes.filter(
          ({ key, value, type }) => key && value && type,
        ),
        icon: encodedIcons,
        images: [encodedImages],
        assets: encodedAssets,
      },
    };

    const { url } = await dataProvider.upload(
      new Blob([new Uint8Array(Buffer.from(JSON.stringify(metadata)))]),
    );

    const { values } = erc725js.encodeData([
      {
        keyName: 'LSP4Metadata',
        value: {
          json: metadata,
          url,
        },
      },
    ]);
    console.log(values);

    setVerifiableUri(values[0]);
    setUploadStatus(2);
  };

  const reset = () => {
    setName('');
    setDescription('');
    setLinks([{ title: '', url: '' }]);
    setAttributes([{ key: '', value: '', type: '' }]);
    setIcons([]);
    setSelectedIcon(undefined);
    setImages([]);
    setSelectedImage(undefined);
    setAssets([]);
    setSelectedAsset(undefined);
    setUploadStatus(0);
    setVerifiableUri('');
  };

  return (
    <>
      <Head>
        <title>LSP4 Metadata - ERC725 Tools</title>
      </Head>
      <div className="container is-fullwidth">
        <input
          className="input mb-2"
          type="text"
          placeholder="name"
          onChange={(event) => setName(event.target.value)}
        />
        <textarea
          className="textarea is-fullwidth"
          placeholder="description"
          onChange={(event) => setDescription(event.target.value)}
        />

        <div style={{ border: '1px solid #D3D3D3', margin: '20px 0px' }} />

        {/* Links */}
        <p className="mb-2">Links</p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {links.map(({ title, url }, index) => (
            <div
              key={index}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <input
                className="input"
                type="text"
                placeholder="link title"
                onChange={(event) => {
                  const newLinks = links;
                  newLinks[index].title = event.target.value;

                  setLinks(newLinks);
                }}
              />
              <input
                className="input"
                type="text"
                placeholder="link url"
                onChange={(event) => {
                  const newLinks = links;
                  newLinks[index].url = event.target.value;

                  setLinks(newLinks);
                }}
              />
              {index === links.length - 1 ? (
                <button
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    links[links.length - 1].title && links[links.length - 1].url
                      ? setLinks([...links, { title: '', url: '' }])
                      : null
                  }
                >
                  Add item
                </button>
              ) : (
                <button
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    setLinks(
                      links.filter(
                        (link) => link.title !== title && link.url !== url,
                      ),
                    )
                  }
                >
                  Add item
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ border: '1px solid #D3D3D3', margin: '20px 0px' }} />

        {/* Attributes */}
        <p className="mb-2">Attributes</p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {attributes.map(({ key, value, type }, index) => (
            <div
              key={index}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <input
                className="input"
                type="text"
                placeholder="attribute kind"
                onChange={(event) => {
                  const newAttributes = attributes;
                  newAttributes[index].key = event.target.value;

                  setAttributes(newAttributes);
                }}
              />
              <input
                className="input"
                type="text"
                placeholder="attribute name"
                onChange={(event) => {
                  const newAttributes = attributes;
                  newAttributes[index].value = event.target.value;

                  setAttributes(newAttributes);
                }}
              />
              <AttributeTypeSelect
                selectedType={
                  attributes[index].type as 'string' | 'number' | 'boolean'
                }
                onChange={(type) => {
                  const newAttributes = attributes;
                  newAttributes[index].type = type;

                  setAttributes(newAttributes);
                }}
              />
              {index === attributes.length - 1 ? (
                <button
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    attributes[attributes.length - 1].key &&
                    attributes[attributes.length - 1].value &&
                    attributes[attributes.length - 1].type
                      ? setAttributes([
                          ...attributes,
                          { key: '', value: '', type: '' },
                        ])
                      : null
                  }
                >
                  Add attribute
                </button>
              ) : (
                <button
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    setAttributes(
                      attributes.filter(
                        (attribute) =>
                          attribute.key !== key &&
                          attribute.value !== value &&
                          attribute.type !== type,
                      ),
                    )
                  }
                >
                  Add
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ border: '1px solid #D3D3D3', margin: '20px 0px' }} />

        {/* Icon upload */}
        <p className="mb-2">Icon</p>

        <FileSelect
          file={selectedIcon}
          inputText="Choose an icon…"
          choose={iconSelect}
        />

        {selectedIcon && selectedIcon.image ? (
          <UploadedFile
            file={selectedIcon}
            addToList={() => (
              setIcons([...icons, selectedIcon]), setSelectedIcon(undefined)
            )}
            remove={() => setSelectedIcon(undefined)}
          />
        ) : (
          <></>
        )}

        <div style={{ border: '1px solid #D3D3D3', margin: '20px 0px' }} />

        {icons.map((icon) => (
          <UploadedFile
            key={icon.hash}
            file={icon}
            remove={() =>
              setIcons(icons.filter(({ hash }) => hash !== icon.hash))
            }
          />
        ))}

        {icons.length > 0 ? (
          <div style={{ border: '1px solid #D3D3D3', margin: '20px 0px' }} />
        ) : (
          <></>
        )}

        {/* Image upload */}
        <p className="mb-2">Images</p>

        <FileSelect
          file={selectedImage}
          inputText="Choose an image…"
          choose={imageSelect}
        />

        {selectedImage && selectedImage.image ? (
          <UploadedFile
            file={selectedImage}
            addToList={() => (
              setImages([...images, selectedImage]), setSelectedImage(undefined)
            )}
            remove={() => setSelectedImage(undefined)}
          />
        ) : (
          <></>
        )}

        <div style={{ border: '1px solid #D3D3D3', margin: '20px 0px' }} />

        {images.map((image) => (
          <UploadedFile
            key={image.hash}
            file={image}
            remove={() =>
              setImages(images.filter(({ hash }) => hash !== image.hash))
            }
          />
        ))}

        {images.length > 0 ? (
          <div style={{ border: '1px solid #D3D3D3', margin: '20px 0px' }} />
        ) : (
          <></>
        )}

        {/* Asset upload */}
        <p className="mb-2">Assets</p>

        <FileSelect
          file={selectedAsset}
          inputText="Choose an asset…"
          choose={assetSelect}
        />

        {selectedAsset ? (
          <UploadedFile
            file={selectedAsset}
            addToList={() => (
              setAssets([...assets, selectedAsset]), setSelectedAsset(undefined)
            )}
            remove={() => setSelectedAsset(undefined)}
          />
        ) : (
          <></>
        )}

        <div style={{ border: '1px solid #D3D3D3', margin: '20px 0px' }} />

        {assets.map((asset) => (
          <UploadedFile
            key={asset.hash}
            file={asset}
            remove={() =>
              setAssets(assets.filter(({ hash }) => hash !== asset.hash))
            }
          />
        ))}

        {assets.length > 0 ? (
          <div style={{ border: '1px solid #D3D3D3', margin: '20px 0px' }} />
        ) : (
          <></>
        )}

        {uploadStatus === 0 ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              margin: '20px 0px',
            }}
          >
            <button className="button is-dark" onClick={upload}>
              Upload metadata
            </button>
          </div>
        ) : uploadStatus === 1 ? (
          <progress className="progress is-small is-primary" max="100">
            15%
          </progress>
        ) : uploadStatus === 2 ? (
          <>
            <pre
              style={{
                width: '100%',
                textAlign: 'center',
                overflow: 'hidden',
                textWrap: 'balance',
                wordBreak: 'break-all',
              }}
            >
              {verifiableUri}
            </pre>

            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                margin: '20px 0px',
              }}
            >
              <button className="button is-dark" onClick={reset}>
                Reset
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Lsp4MetadataEncoderPage;
