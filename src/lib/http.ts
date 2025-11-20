type HttpParameters = Parameters<typeof fetch>

const setupRequestInit = (extendInit?: RequestInit) => {
  const init: RequestInit = { credentials: 'include' }
  return extendInit ? { ...init, ...extendInit } : init
}

export default (...args: HttpParameters) => fetch(args[0], setupRequestInit(args[1]))
