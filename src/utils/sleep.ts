/**
 * 指定した秒数だけスリープする
 */
export async function sleep(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}
