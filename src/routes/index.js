import React from 'react';
import EasyChat from '~/utils/easy-chat';
class Demo extends React.PureComponent{
    state = {
    }
    render(){
      const options = {
        nickname:'',
        defaultTalk:[],
        status:'',
        chatStatus:'',
        placeholder:'',
      }
        return (
          <div>
            <EasyChat options={options} />
          </div>
        )
    }
}
export default Demo;
