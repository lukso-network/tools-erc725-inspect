export const ADDRESS_BADGES: {
  [key: string]: {
    text: string;
    colorClass: string;
    light: boolean;
  };
} = {
  'UP Recovery': {
    text: '🌱 UP Recovery',
    colorClass: 'is-success',
    light: false,
  },
  'LSP1 Delegate': {
    text: '📢 LSP1 Delegate',
    colorClass: 'is-link',
    light: false,
  },
  'LSP1 Grave Forwarder': {
    text: '👻 LSP1 Grave Forwarder',
    colorClass: 'is-danger',
    light: true,
  },
  'Gnosis Safe': {
    text: '🥝 Gnosis Safe',
    colorClass: 'is-success',
    light: true,
  },
  'LSP7 Digital Asset': {
    text: '🪙 LSP7 Digital Asset',
    colorClass: 'is-warning',
    light: true,
  },
  'LSP8 Identifiable Digital Asset': {
    text: '🎨 LSP8 Identifiable Digital Asset',
    colorClass: 'is-link',
    light: true,
  },
};
