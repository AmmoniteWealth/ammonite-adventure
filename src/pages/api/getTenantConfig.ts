import type { NextApiHandler } from "next";

import tenantConfig from './tenantConfig.json';

const countHandler: NextApiHandler = async (request, response) => {
  // simulate IO latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  response.json(tenantConfig);
};

export default countHandler;
