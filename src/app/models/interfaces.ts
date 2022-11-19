export interface IAtcData {
  _id?: any,
  town: string,
  atc: string | string[],
  adress?: {
    // display_name?: string
    [key:string]: string,
  },
  location: string[],
  work: boolean,
  cabel?: {
      length: number,
      amount: number,
      empty: number,
      busy: number,
  }
}
// export const baseUrl = 'https://basestationsmapserver.herokuapp.com/api/stations';
export const baseUrl = 'http://localhost:5000/api/stations';
