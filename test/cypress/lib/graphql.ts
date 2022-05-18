export const graphql = <TData, TVariables = object | undefined>(query: string, variables?: TVariables): Promise<TData> => new Promise((resolve) => {
  cy
    .request({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      body: {
        query,
        variables,
      },
    })
    .its('body.data')
    .then((data: TData) => resolve(data))
})
