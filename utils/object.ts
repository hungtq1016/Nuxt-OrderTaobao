const isObjectEmpty = (obj: any) => {
  const result = (Object.keys(obj) as (keyof typeof obj)[]).findIndex((key) => {
    return obj[key] !== '';
  });
  
  return result == -1 ? true : false;
};

export {isObjectEmpty}