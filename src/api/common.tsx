import * as HttpUtils from '../utils/request';
import * as Api from '../api/constant';
import {Toast} from '../component/teaset/index';

export function get_upload_qiuniu_config(params:any) {
  return new Promise((resolve, reject) => {
    HttpUtils.get(Api.GET_UPLOAD_QINIU_CONFIG, params, '').then((res:any )=> {
      switch (res.error) {
        case 0:
          resolve(res.data);
          break;
        default:
          Toast.fail(res.message);
          reject(res);
          break;
      }
    });
  });
}