export type WeatherCityCode = 'Taipei' | 'NewTaipei' | 'Taoyuan' | 'Taichung' | 'Kaohsiung';
export interface WeatherCityOption {
  value: WeatherCityCode;
  name: string;
}

export const WeatherCityOptions: WeatherCityOption[] = [
  { value: 'Taipei', name: '臺北市' },
  { value: 'NewTaipei', name: '新北市' },
  { value: 'Taoyuan', name: '桃園市' },
  { value: 'Taichung', name: '臺中市' },
  { value: 'Kaohsiung', name: '高雄市' }
];

export const WeatherCityMap: Record<WeatherCityCode, string> = {
  Taipei: '臺北市',
  NewTaipei: '新北市',
  Taoyuan: '桃園市',
  Taichung: '臺中市',
  Kaohsiung: '高雄市'
};
