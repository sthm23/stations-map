import {andijon} from './andijon';
import {buxara} from './buxara';
import {djizzakh} from './djizzakh';
import {fargona} from './fargona';
import {karakalpak} from './karakalpak';
import {namangan} from './namangan';
import {navoi} from './navoi';
import {qashqadaryo} from './qashqadaryo';
import {samarqand} from './samarqand';
import {sirdaryo} from './sirdaryo';
import {surxondaryo} from './surxondaryo';
import {toshkent_shaxar} from './tosh-shaxar';
import {toshkent} from './toshkent';
import {xorezm} from './xorezm';

const arr = [andijon, buxara, djizzakh, fargona, karakalpak, toshkent, xorezm,
  namangan, navoi, qashqadaryo, samarqand, sirdaryo, surxondaryo, toshkent_shaxar];

export const allRegionsMap:any = arr.map(item => item.regions.map(el=> el.map_in).filter(region => region.geometry.coordinates)).flat(1).map((item, ind)=>{ 
  item['id'] = ind
  return item
});
// item.id === 60_16 ? item.map_in : ''
export const regionsAnd:any = karakalpak.regions.map(item => item.id === 95_11 ? item.map_in : '').filter(item =>item !== '' && item.geometry.coordinates !== null);

// console.log(allRegionsMap);
