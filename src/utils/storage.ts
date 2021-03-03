import store2 from "store2";

// 所有方法均为异步返回结果，为了兼容chrome Api

const get = async <T = unknown>(key: string) => {
  return (store2.get(key) as T) || null;
};

const set = async (key: string, data: unknown) => {
  return store2.set(key, data);
};

const storage = {
  get,
  set,
};

export default storage;
