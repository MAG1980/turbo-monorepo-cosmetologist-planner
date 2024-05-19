export const getRandomPassword = async (
  length = 20,
  characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$',
) => {
  const crypto = await import('node:crypto');
  const randomNumbers: number[] = Array.from(
    crypto.randomFillSync(new Uint32Array(length)),
  );

  return randomNumbers.map((x) => characters[x % characters.length]).join('');
};
