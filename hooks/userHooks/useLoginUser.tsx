const useLoginUser = () => {
  const token = (typeof window !== 'undefined' && localStorage.getItem('_jwtToken')) ? localStorage.getItem('_jwtToken') : '';
  const user = (typeof window !== 'undefined' && localStorage.getItem('_user')) ? localStorage.getItem('_user') : '';
  const isLoggedIn = token ? true : false

  return {
    token, user, isLoggedIn
  }

}

export default useLoginUser