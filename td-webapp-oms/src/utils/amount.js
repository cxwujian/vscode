// 前端统一使用标准金额单位显示
// 数据库统一存储最小金额单位
// 请求统一提交最小金额单位

// 标准单位与最小单位换算比
const percent = {
  CNY: 100,  // 1元 = 100分
  USD: 100,  // 1美元 = 100美分
  GBP: 100,  // 1英镑 = 100便士
  EUR: 100,  // 1欧元 = 100欧分
  KRW: 1,    // 1韩元 = 1韩元
  HKD: 100,   // 1港币 = 100分
  TWD: 100,  // 1台币 = 100分
  MYR: 100,  // 1令吉 = 100分
  SGD: 100,  // 1新币 = 100分
  THB: 100,  // 1铢   = 100萨当
  JPY: 1,    // 1日元 = 1日元
  CAD: 100,  // 1加元 = 100加分
  AUD: 100,  // 1澳元 = 100澳分
  BRL: 100,  // 1雷亚尔 = 100雷亚尔分
  KHR: 100,  // 1瑞尔 = 100仙
  GHS: 100,  // 1加纳赛斯 = 100比塞瓦
  INR: 100,  // 1印度卢比 = 100派士
  IDR: 1,    // 1印尼卢比 = 1印尼卢比
  IRR: 1,    // 1伊朗里亚尔 = 1伊朗里亚尔
  IMP: 100,  // 1马恩岛镑 = 100便士
  ILS: 100,  // 1以色列新锡克尔 = 100新阿哥拉
  KPW: 100,  // 1朝鲜圆 = 100分
  MXN: 100,  // 1墨西哥比索 = 100分
  MNT: 100,  // 1蒙古图格里克 = 100蒙戈
  DKK: 100,  // 1丹麦克朗 = 100欧尔
  ZAR: 100,  // 1南非兰特 = 100分
  NZD: 100,  // 1新西兰元 = 100分
  PAB: 100,  // 1巴拿马巴波亚 = 100分
  PHP: 100,  // 1菲律宾比索 = 100分
  RUB: 100,  // 1俄罗斯卢布 = 100戈比
  SEK: 100,  // 1瑞典克朗 = 100奥拉
  CHF: 100,  // 1瑞士法郎 = 100生丁
  VND: 1,    // 1越南盾 = 1越南盾
};

/**
 * 根据币种 标准金额单位 转 最小金额单位
 * @param {*} amt
 * @param {*} currency
 */
export function standUnitToMinUnit(amt, currency = 'CNY') {
  if (amt.toString() === 0) {
    return amt;
  }
  // 标准单位小数点位置
  const t = percent[currency].toString().length - 1;
  let stand = amt.toString().replace(/,/g, '');
  if (t > 0) {
    const arr = stand.split('.');
    // 整数部分
    const i = arr[0];
    // 小数部分
    let p = arr.length > 1 ? arr[1] : '';
    if (p.length > t) {
      p = p.substring(0, t);
    } else {
      while (p.length < t) {
        p = `${p}0`;
      }
    }
    stand = `${i}${p}`;
  }
  return stand;
}

/**
 * 根据单位 最小金额单位 转 标准金额单位
 * @param {*} amt
 * @param {*} currency
 */
export function amtMinUnitToStandUnit(amt = 0, currency = 'CNY') {
  if (amt === null || amt === 'null') {
    return '0';
  }
  if (amt.toString() === 0) {
    return amt;
  }
  // 标准单位小数点位置
  const t = percent[currency].toString().length - 1;
  // 移除逗号和小数点 (理论上最小单位不应该有小数点)
  let min = amt.toString().replace(/,/g, '').split('.')[0];
  let minLen = min.length;
  let fin = false;
  if (t > 0) {
    // 位数不够左补0 (1 => 001)
    while (minLen <= t) {
      if (minLen === t) {
        min = `0.${min}`;
        minLen++;
        fin = true;
      } else {
        min = `0${min}`;
        minLen++;
      }
    }
    // if (!fin) {
    //   // 整数部分
    //   let i = min.substring(0, minLen - t);
    //   // 去左补位的0
    //   while (i.charAt(0) === '0' && i.length > 1) {
    //     i = i.replace(/0/, '');
    //   }
    //   // 小数部分
    //   const p = min.substring(minLen - t, minLen);
    //   // 插入小数点
    //   min = `${i}.${p}`;
    // }
  }
  if (!fin) {
    // 整数部分
    let i = min.substring(0, minLen - t);
    // 去左补位的0
    while (i.charAt(0) === '0' && i.length > 1) {
      i = i.replace(/0/, '');
    }
    // 小数部分
    const p = min.substring(minLen - t, minLen);
    if (p === '' || p === null) {
      //如果小数部分没有则不需要小数点，例如日元最小单位就是元，不存在小数点，如1日元而人民币
      //最小单位是分，存在小数点。如1.00元
      min = `${i}`;
    } else { //如果小数部分存在则添加小数点
      min = `${i}.${p}`;
    }
  }
  return min;
}

export function fenToYuan(fen) {
  return amtMinUnitToStandUnit(fen);
}
