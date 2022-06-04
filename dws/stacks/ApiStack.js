import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);

  // create the API
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
    },
    routes: {
      "GET /dws": "functions/list.main",
      "POST /dws": "functions/create.main",
      "GET /dws/{id}": "functions/get.main",
      "PUT /dws/{id}": "functions/update.main",
      "DELETE /dws/{id}": "functions/delete.main",
      "POST /dwcalc": "functions/dwcalc.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}