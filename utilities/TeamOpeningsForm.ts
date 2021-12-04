import { validationSchema } from './openings/teamUpPostFormValidator';

export const teamOpeningsForm: Record<string, any> = {
  'bgmi-m': {
    forms: [
      {
        label: 'Game Mode',
        name: 'mode',
        formType: 'dropDown',
        dropDownOptions: ['TDM', 'Battle Royale'],
      },
      {
        label: 'Perspective',
        name: 'perspective',
        formType: 'dropDown',
        dropDownOptions: ['TPP', 'FPP'],
      },
      {
        label: 'Minimum K/D',
        name: 'kd',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '3.2',
      },
      {
        label: 'Minimum Tier',
        name: 'tier',
        formType: 'dropDown',
        dropDownOptions: [
          'Bronze',
          'Silver',
          'Gold',
          'Platinum',
          'Diamond',
          'Crown',
          'Ace',
          'Ace Master',
          'Conqueror',
        ],
        dataType: 'string',
      },
      {
        label: 'Minimum Avg. Damage',
        name: 'averageDamage',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '800',
      },
      {
        label: 'Minimum Experience',
        name: 'experience',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '1 Year',
      },
      {
        label: 'Preferred Role',
        name: 'role',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'e.g. - IGL, Fragger, etc',
      },
      {
        label: 'Age',
        name: 'age',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '20',
      },
      {
        label: 'Purpose',
        name: 'purpose',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'for rank push, clan, etc',
      },
      {
        label: 'Time Avalability',
        name: 'timeAvailability',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'e.g. - 9:00PM - 11:00PM',
      },
      {
        label: 'Preferred Language',
        name: 'language',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'e.g. - English, Hindi, Tamil, etc',
      },
      {
        label: 'Description',
        name: 'description',
        formType: 'textArea',
        dataType: 'string',
        placeholder:
          'Write something about yourself and, some skills ' +
          '/ quality you want from your team-mate.',
      },
    ],
    // Initial Values
    initialValues: {
      mode: '',
      perspective: '',
      kd: '',
      tier: '',
      averageDamage: '',
      experience: '',
      role: '',
      age: '',
      purpose: '',
      timeAvailability: '',
      language: '',
      description: '',
    },
    // Validation Schema
    validationSchema: validationSchema,
  },

  'cod-m': {
    forms: [
      {
        label: 'Game Mode',
        name: 'mode',
        formType: 'dropDown',
        dropDownOptions: ['Multiplayer', 'Battle Royale'],
      },
      {
        label: 'Perspective',
        name: 'perspective',
        formType: 'dropDown',
        dropDownOptions: ['TPP', 'FPP'],
      },
      {
        label: 'Minimum K/D',
        name: 'kd',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '3.2',
      },
      {
        label: 'Minimum Tier',
        name: 'tier',
        formType: 'dropDown',
        dropDownOptions: [
          'Rookie',
          'Veteran',
          'Elite',
          'Pro',
          'Master',
          'Grand Master',
          'Legendary',
        ],
        dataType: 'string',
      },
      {
        label: 'Minimum Avg. Damage',
        name: 'averageDamage',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '800',
      },
      {
        label: 'Minimum Experience',
        name: 'experience',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '1 Year',
      },
      {
        label: 'Preferred Role',
        name: 'role',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'e.g. - IGL, Sniper, etc',
      },
      {
        label: 'Age',
        name: 'age',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '20',
      },
      {
        label: 'Purpose',
        name: 'purpose',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'for rank push, clan, etc',
      },
      {
        label: 'Time Avalability',
        name: 'timeAvailability',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'e.g. - 9:00PM - 11:00PM',
      },
      {
        label: 'Preferred Language',
        name: 'language',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'e.g. - English, Hindi, Tamil, etc',
      },
      {
        label: 'Description',
        name: 'description',
        formType: 'textArea',
        dataType: 'string',
        placeholder:
          'Write something about yourself and, some skills ' +
          '/ quality you want from your team-mate.',
      },
    ],
    // Initial Values
    initialValues: {
      mode: '',
      perspective: '',
      kd: '',
      tier: '',
      averageDamage: '',
      experience: '',
      role: '',
      age: '',
      purpose: '',
      timeAvailability: '',
      language: '',
      description: '',
    },
    // Validation Schema
    validationSchema: validationSchema,
  },

  'gff-m': {
    forms: [
      {
        label: 'Game Mode',
        name: 'mode',
        formType: 'dropDown',
        dropDownOptions: ['TDM', 'Battle Royale'],
      },
      {
        label: 'Perspective',
        name: 'perspective',
        formType: 'dropDown',
        dropDownOptions: ['TPP', 'FPP'],
      },
      {
        label: 'Minimum K/D',
        name: 'kd',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '3.2',
      },
      {
        label: 'Minimum Tier',
        name: 'tier',
        formType: 'dropDown',
        dropDownOptions: [
          'Bronze',
          'Silver',
          'Platinum',
          'Diamond',
          'Heroic',
          'Grand Master',
        ],
        dataType: 'string',
      },
      {
        label: 'Minimum Avg. Damage',
        name: 'averageDamage',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '800',
      },
      {
        label: 'Minimum Experience',
        name: 'experience',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '1 Year',
      },
      {
        label: 'Preferred Role',
        name: 'role',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'e.g. - IGL, Sniper, etc',
      },
      {
        label: 'Age',
        name: 'age',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '20',
      },
      {
        label: 'Purpose',
        name: 'purpose',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'for rank push, clan, etc',
      },
      {
        label: 'Time Avalability',
        name: 'timeAvailability',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'e.g. - 9:00PM - 11:00PM',
      },
      {
        label: 'Preferred Language',
        name: 'language',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'e.g. - English, Hindi, Tamil, etc',
      },
      {
        label: 'Description',
        name: 'description',
        formType: 'textArea',
        dataType: 'string',
        placeholder:
          'Write something about yourself and, some skills ' +
          '/ quality you want from your team-mate.',
      },
    ],
    // Initial Values
    initialValues: {
      mode: '',
      perspective: '',
      kd: '',
      tier: '',
      averageDamage: '',
      experience: '',
      role: '',
      age: '',
      purpose: '',
      timeAvailability: '',
      language: '',
      description: '',
    },
    // Validation Schema
    validationSchema: validationSchema,
  },
};
