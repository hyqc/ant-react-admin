import { ReponseCurrentAdminUserDetailType } from '@/services/apis/admin/account';
import { history } from 'umi';
// import routes from '../config/routes';

// console.log('=======', routes);
/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: ReponseCurrentAdminUserDetailType }) {
  const { currentUser } = initialState || {};
  console.log('========', initialState);
  const permissions = currentUser?.permissions || {};
  console.log('========', permissions);
  console.log('========', history);
  return {
    canAdmin: true,
  };
}
