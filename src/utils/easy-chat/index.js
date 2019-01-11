import React from 'react';
import { Motion, spring, presets } from 'react-motion';
import styles from './index.css';
console.log(styles);
let timer = null;
class EasyChat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      left:500,
      btnLeft:-10,
      answerList:[],
      currentSelect:'',
      sendSrc:2,
      loading:false
    }
  }
  initChat = async () => {
    const _this = this;
    let answerList;
    if(this.props.options.defaultTalk.length){
      const arr = this.props.options.defaultTalk.map(ele => {
        return {
          bol: 0,
          value: ele
        }
      })
      answerList = arr
    }else{
      answerList = [{bol:0,value:'您好，小主人，我是Sakai，赶快和我聊天试试吧！'},{bol:0,value:'我上知天文下知地理。古今中外无所不晓哦~'},{bol:0,value:'(*^▽^*)'}];
    }
    const arr = [];
    this.setState({
      btnLeft:200
    })
    setTimeout(() => {
      _this.setState({
        left:-10,
      })
    }, 200);
    answerList.forEach((ele,index) => {
      setTimeout(() => {
        arr.push(ele)
        _this.setState({
          answerList:arr
        })
      }, 500 * index)
    })
  }
  exit = () => {
    const _this = this;
    this.setState({
      left:500
    })
    setTimeout(() => {
      _this.setState({
        btnLeft:-10
      })
    }, 200);
  }
  onKeyDown = async (e) => {
    if(e.keyCode === 13 && this.state.currentSelect){
      //监听回车事件
      const answerList = this.state.answerList;
      answerList.push({bol:1,value:this.state.currentSelect});
      this.setState({
        answerList,
        sendSrc:2
      })
      this.submit(true);
    }
  }
  listenInput = (e) => {
    const sendSrc = e.target.value ? 1 : 2;
    this.setState({
      currentSelect:e.target.value,
      sendSrc
    })
  }
  submit = (databol = false) => {
    if(!this.state.currentSelect){
      return
    }else{
      this.setState({
        loading:true
      })
    }
    const _this = this;
    const currentData = {
      "reqType":0,
        "perception": {
            "inputText": {
                "text": this.state.currentSelect
            },
        },
        "userInfo": {
            "apiKey": "f602ee1b116b4755ae01704fa5ef83dd",
            "userId": "c879a7ecea92222b"
        }
    }
    if(!databol){
      const currentList = this.state.answerList;
      currentList.push({bol:1,value:this.state.currentSelect})
      this.setState({
        answerList:currentList,
      })
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      fetch('http://121.40.214.215:8001/api/v1/faq/turing/',{
        method:'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(currentData)
      }).then(res => res.json()).then(data => {
        //不合法 4007
        console.log(data)
        if(data.intent.code !== 4007){
          const item = _this.state.answerList;
          const value = data.results.map(ele => {
            const text = [];
            for(const key in ele.values){
              if(ele.values[key]){
                text.push(ele.values[key])
              }
            }
            return text.join(' ')
          })
          item.push({bol:0,value:value.join(' ')});
            _this.setState({
              answerList:item,
              currentSelect:'',
              loading:false
            })
        }
      })
    }, 1000);
    _this.setState({
      sendSrc:2,
      currentSelect:' '
    })
  }
  handleScroll = (e) => {
  }
  componentDidMount(){
    document.addEventListener("keydown", this.onKeyDown)
    document.getElementById('bottomWrap').addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKeyDown)
  }
  render(){
    const img = require(`./icon/send-${this.state.sendSrc}.png`);
    return (
      <div>
        <Motion style={{btn: spring(this.state.btnLeft,presets.stiff)}}>
          { sty => <div style={{transform: `translateX(${sty.btn}px)`}} onClick={this.initChat} className={styles.clickImage}></div> }
        </Motion>
        <Motion style={{x: spring(this.state.left, presets.stiff)}}>
          {interpolatingStyle => <section style={{transform: `translateX(${interpolatingStyle.x}px)`}} className={styles.chatContainer}>
            <div className={styles.bottomHeader}>
              <div className={styles.botImg}></div>
              <div className={styles.botText}>
                <span>{this.props.options.nickname ? this.props.options.nickname : 'Sakai'}</span>
                <br />
                <span className={!this.state.loading ? styles.status : ''}>{!this.state.loading ? this.props.options.status ? this.props.options.status :'在线':this.props.options.chatStatus ? this.props.options.chatStatus : '正在聊天...'}</span>
              </div>
              <div className={styles.headerExit} onClick={this.exit}></div>
            </div>
            <div className={styles.container}>
              <div id="bottomWrap" className={styles.bottomWrap}>
              {
                this.state.answerList.map((ele,index) =>{
                  return ele.bol ? (
                    <div key={index} className={styles.answerItem}>
                      <img src={require('./icon/xiong.png')} alt="" />
                      <p>{ele.value}</p>
                    </div>
                  ) : (
                    <div key={index} className={styles.chatItem}>
                      <img src={require('./icon/jiqimao.png')} alt="" />
                      <p>{ele.value}</p>
                    </div>
                  )
                }
              )}
              </div>
            </div>
            <div className={this.state.sendSrc === 1 ? styles.containerBottomFocus : styles.containerBottom}>
            <input placeholder={this.props.options.placeholder ? this.props.options.placeholder : "什么都可以问我哦"} value={this.state.currentSelect} onChange={this.listenInput} className={styles.bottmInput} />
            <img onClick={()=> this.submit()} className={styles.bottomBtn} src={img} alt="" />
            </div>
          </section>}
        </Motion>
      </div>
    )
  }
}

export default EasyChat
