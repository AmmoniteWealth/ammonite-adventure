import { api } from "./api";

export const configApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTenantConfig: build.query({
      query: (hostname: string) => {
        return {
          url: "getTenantConfig",
          method: "POST",
          body: {
            params: {
              hostname,
            },
          },
        };
      },
      providesTags: ["config"],
    }),
    getNonClientData: build.query({
      query: (hostname: string) => {
        return {
          url: "fetchNonClientData",
          method: "POST",
          body: {
            params: {
              hostname,
              document_types: ["Pension data", "Assumptions", "Allowances"],
            },
          },
        };
      },
      providesTags: ["config"],
    }),
  }),
});

export const { useGetTenantConfigQuery, useGetNonClientDataQuery } = configApi;
