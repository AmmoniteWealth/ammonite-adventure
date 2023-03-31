export const getIsClient = (jsonPath: any) => {
  if (jsonPath && jsonPath.default) {
    let _def = jsonPath.default;
    if (jsonPath.client && Object.keys(jsonPath.client).length > 0) {
      _def = jsonPath.client;
    }
    return _def;
  }
};
