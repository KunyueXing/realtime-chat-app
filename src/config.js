import { enUS, zhCN, frFR, esES} from '@mui/material/locale';

export const langOptions = [
    {
        label: 'English',
        value: 'en',
        systemValue: enUS,
        icon: '/assets/icons/flags/ic_flag_en.svg',
      },
      {
        label: 'French',
        value: 'fr',
        systemValue: frFR,
        icon: '/assets/icons/flags/ic_flag_fr.svg',
      },
      {
        label: 'Chinese',
        value: 'cn',
        systemValue: zhCN,
        icon: '/assets/icons/flags/ic_flag_cn.svg',
      },
      {
        label: 'Spanish',
        value: 'es',
        systemValue: esES,
        icon: '/assets/icons/flags/ic_flag_es.svg',
      },
];

// the default language is English
export const defaultLang = langOptions[0];

export const defaultSettings = {
    themeMode: "light",
    themeDirection: "ltr",
    themeContrast: "default",
    themeLayout: "horizontal",
    themeColorPresets: "default",
    themeStretch: false,
};
