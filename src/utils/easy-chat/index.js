import React from 'react';
import { Motion, spring, presets } from 'react-motion';
import styles from './index.css';
class EasyChat extends React.PureComponent{
  state = {
    left:500,
    btnLeft:-10
  }
  initChat = () => {
    const _this = this;
    this.setState({
      btnLeft:200
    })
    setTimeout(() => {
      _this.setState({
        left:-10
      })
    }, 200);
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
  render(){
    return (
      <div>
        <Motion style={{btn: spring(this.state.btnLeft,presets.stiff)}}>
          { sty => <div style={{transform: `translateX(${sty.btn}px)`}} onClick={this.initChat} className={styles.clickImage}></div> }
        </Motion>
        <Motion style={{x: spring(this.state.left, presets.stiff)}}>
          {interpolatingStyle => <section style={{transform: `translateX(${interpolatingStyle.x}px)`}} className={styles.chatContainer}>
            <div className={styles.bottomHeader}>
              <div className={styles.botImg}></div>
              <div className={styles.headerExit} onClick={this.exit}></div>
            </div>
            <div className={styles.bottomWrap}>
              <div className={styles.chatList}></div>
            </div>
            <div className={styles.containerBottom}>
            <input className={styles.bottmInput} />
            <div className={styles.bottomBtn}></div>
            </div>
          </section>}
        </Motion>
      </div>
    )
  }
}

export default EasyChat
