import { HEX_VALUES } from '../constants';

export default class ColorService {
  private constructor() {}

  public static random(): string {
    const values: string[] = [];

    for (let i = 0; i < 6; i++) {
      const index: number = Math.floor(Math.random() * 16);
      values.push(HEX_VALUES[index]);
    }

    return `#${values.join('')}`;
  }
}
