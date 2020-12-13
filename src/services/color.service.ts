/* eslint-disable no-dupe-class-members */
import { HEX_VALUES } from '../constants';

export default class ColorService {
  private constructor() {}

  public static random(): string;
  public static random(count: number): string[];
  public static random(count?: number): string | string[] {
    if (count) {
      const valueList: string[] = [];

      for (let i = 0; i < count; i++) {
        valueList.push(ColorService.randomColor());
      }

      return valueList;
    }

    return ColorService.randomColor();
  }

  public static toHex(value: number): string {
    const multipleOf16: number = Math.floor(value / 16);
    const multipleOf1: number = Math.floor(value) % 16;
    return `${HEX_VALUES[multipleOf16]}${HEX_VALUES[multipleOf1]}`;
  }

  private static randomColor(): string {
    const values: string[] = [];

    for (let i = 0; i < 6; i++) {
      const index: number = Math.floor(Math.random() * 16);
      values.push(HEX_VALUES[index]);
    }

    return `#${values.join('')}`;
  }
}
