export const HostEventForm: Record<string, any> = {
  'bgmi-m': {
    form: [
      {
        labelName: 'Game Mode',
        name: 'mode',
        formType: 'radio',
        dataType: 'string',
        options: ['Solo', 'Duo', 'Squad'],
      },
      {
        labelName: 'Tier',
        name: 'tier',
        formType: 'radio',
        dataType: 'string',
        options: ['T1', 'T2', 'T3'],
      },
      {
        labelName: 'NO. of Slots',
        name: 'slots',
        formType: 'slider',
        dataType: 'number',
        max: 25,
        min: 2,
      },
    ],
  },
  'cod-m': {
    form: [
      {
        labelName: 'Game Mode',
        name: 'mode',
        formType: 'radio',
        dataType: 'string',
        options: ['Solo', 'Duo', 'Squad'],
      },
      {
        labelName: 'Tier',
        name: 'tier',
        formType: 'radio',
        dataType: 'string',
        options: ['T1', 'T2', 'T3'],
      },
      {
        labelName: 'NO. of Slots',
        name: 'slots',
        formType: 'slider',
        dataType: 'number',
        max: 25,
        min: 2,
      },
    ],
  },
  'gff-m': {
    form: [
      {
        labelName: 'Game Mode',
        name: 'mode',
        formType: 'radio',
        dataType: 'string',
        options: ['Solo', 'Duo', 'Squad'],
      },
      {
        labelName: 'Tier',
        name: 'tier',
        formType: 'radio',
        dataType: 'string',
        options: ['T1', 'T2', 'T3'],
      },
      {
        labelName: 'NO. of Slots',
        name: 'slots',
        formType: 'slider',
        dataType: 'number',
        max: 12,
        min: 2,
      },
    ],
  },
};
