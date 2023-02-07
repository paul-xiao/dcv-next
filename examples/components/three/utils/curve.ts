interface Point {
  x: number;
  y: number;
}
/**
 *
 *
 * @param {number} p0
 * @param {number} p1
 * @param {number} p2
 * @param {number} t
 * @return {*}
 * @memberof Path
 */
export function bezier2P(p0: number, p1: number, p2: number, t: number) {
  const P0 = p0 * Math.pow(1 - t, 2);
  const P1 = p1 * 2 * t * (1 - t);
  const P2 = p2 * t * t;
  return P0 + P1 + P2;
}

/**
 *
 *
 * @param {Point} p0
 * @param {Point} p1
 * @param {Point} p2
 * @param {number} num
 * @param {number} tick
 * @return {*}  {Point}
 * @memberof Path
 */
export function getBezierNowPoint2P(
  p0: Point,
  p1: Point,
  p2: Point,
  num: number,
  tick: number
): Point {
  return {
    x: bezier2P(p0.x, p1.x, p2.x, num * tick),
    y: bezier2P(p0.y, p1.y, p2.y, num * tick),
  };
}

/**
 * 生成二次方贝塞尔曲线顶点数据
 *
 * @param {Point} p0
 * @param {Point} p1
 * @param {Point} p2
 * @param {number} [num=100]
 * @param {number} [tick=1]
 * @return {*}
 * @memberof Path
 */
export function create2PBezier(
  p0: Point,
  p1: Point,
  p2: Point,
  num = 100,
  tick = 1
) {
  const t = tick / (num - 1);
  const points: Point[] = [];
  for (let i = 0; i < num; i++) {
    const point = getBezierNowPoint2P(p0, p1, p2, i, t);
    points.push({ x: point.x, y: point.y });
  }
  return points;
}
