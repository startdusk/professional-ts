/* eslint-disable @typescript-eslint/no-unused-vars */
class Foo {
  // # 表示私有成员变量，和private不同的是，它会被隐藏掉，即使在打断点调试也看不到该私有成员变量
  #name;

  constructor(rawName?: string) {
    // ?? 可以接收空字符串，0，而 || 不可以接受空字符串，0
    // a = '' || '123'; a = '123'
    // a = '' ?? '123'; a = ''
    this.#name = rawName ?? "(no name)";
  }

  log() {
    console.log(this.#name);
  }
}
//================================================================================================
// 自定义定义元组类型的位置，如头尾boolean，中间T
type Arr<T extends any[]> = [boolean, ...T, boolean];

let a: Arr<number[]> = [true, 1, 2, false];

type Address = [number, boolean, string];
let a1: Address = [1, false, "123"];

type MyAddress = [
  streetNumber: number,
  city: string,
  state: string,
  postal: number,
];

function printMyAddress(...address: MyAddress) {}
printMyAddress(122, "San Francisco", "CA", 1231);
//================================================================================================

//================================================================================================
// 支持递归类型
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [k: string]: JSONValue };
const val: JSONValue = {
  name: "benjmain",
  address: {
    street: "Spear St",
  },
};
//================================================================================================

//================================================================================================
// 模板字符串高级用法
type Corner = `${"top" | "bottom"}-${"left" | "right"}`;
// 会被翻译成 type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right"
//================================================================================================

//================================================================================================
// 不出错才会提示
// @ts-expect-error
const num1: number = "123";

// 直接或略任何错误
// @ts-ignore
const num2: number = "123";
//================================================================================================

//================================================================================================
// 错误处理
function somethingRisky() {}

// 断言错误并返回错误类型
function assertIsError(err: any): asserts err is Error {
  if (!(err instanceof Error))
    throw new Error(`Not an error: ${err}`);
}

try {
  somethingRisky();
} catch (err: unknown) {
  // any 表示任何类型(放大范围)，unknown 表示未知类型(缩小范围)
  assertIsError(err);
  console.log(err.stack); // 断言后的类型为 Error 类型，我们可以拿到它的堆栈信息
}

//================================================================================================
// 导入类型
import type { useAsyncDataEffect } from "../src/utils/api";
// useAsyncDataEffect() 只能使用类型，而不能使用函数
//================================================================================================
