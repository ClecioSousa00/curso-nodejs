import * as create from './Signup'
import * as signIn from './SignIn'

export const UsersController = {
  ...create,
  ...signIn,
}
