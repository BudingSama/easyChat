import React from 'react';
import EasyChat from '~/utils/easy-chat';
// import EasyChat from 'react-easychat';
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
        offsetTop:20,
        position:'left'
      }
        return (
          <div>
            <EasyChat options={options} />
          </div>
        )
    }
}
export default Demo;
