import React from 'react'
import { Pane, Heading, Button, Dialog } from 'evergreen-ui'
import { ChevronLeftIcon, AutomaticUpdatesIcon } from 'evergreen-ui'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSet } from '../../actions'

class Learn extends React.Component {
  async componentDidMount() {
    await this.props.fetchSet(this.props.location.pathname.substring(7))
    this.setState({ data: this.props.sets.data.flash_cards })
  }
  state = {
    data: [],
    cardIndex: 0, //index của thẻ đang được học
    right_ans_1: [], //mảng chứa index của thẻ đã được trả lời đúng 1 lần
    right_ans_2: [], //mảng chứa index của thẻ đã được trả lời đúng 2 lần
    options: [0, 1], // mảng chứa các lựa chọn cho người học
    status: 1, // 1 là câu hỏi title, 0 là câu hỏi description
    isShowAnsTrue: false,
    isShowAnsFalse: false,
    isShowDoneLearn: false,
    notify: {
      ans_true: 'Bạn trả lời đúng',
      ans_false: 'Bạn trả lời sai',
      done_learn: 'Hoàn thành bài học',
    },
  }

  check_ans(option) {
    var cardIndex = this.state.cardIndex
    var data_length = this.state.data.length
    if (option === cardIndex) {
      this.setState({ isShowAnsTrue: true })
      if (!this.state.right_ans_1.includes(cardIndex)) {
        this.state.right_ans_1.push(cardIndex)
        var newIndex = this.updateCardIndex()
        this.setState({ options: this.shuffleOptions(newIndex) })
        this.setState({ cardIndex: newIndex })
        console.log(this.state.cardIndex)
        console.log(this.state.options)
      } else {
        this.state.right_ans_2.push(cardIndex)
        if (this.state.right_ans_2.length === data_length) {
          this.setState({ isShowDoneLearn: true })
        } else {
          newIndex = this.updateCardIndex()
          this.setState({ options: this.shuffleOptions(newIndex) })
          this.setState({ cardIndex: newIndex })
          console.log(this.state.cardIndex)
          console.log(this.state.options)
        }
      }
    } else {
      this.setState({ isShowAnsFalse: true })
      newIndex = this.updateCardIndex()
      this.setState({ options: this.shuffleOptions(newIndex) })
      this.setState({ cardIndex: newIndex })
      console.log(this.state.cardIndex)
      console.log(this.state.options)
    }
  }
  shuffleOptions(cardIndex) {
    console.log(cardIndex)
    var data_length = this.state.data.length
    var tem_options = []
    for (var i = 0; i < data_length; i++) {
      if (i !== cardIndex) {
        tem_options.push(i)
      }
    }
    tem_options = this.shuffle(tem_options)
    tem_options = tem_options.slice(0, data_length > 5 ? 3 : 2)
    tem_options.push(cardIndex)
    tem_options = this.shuffle(tem_options)
    return tem_options
  }
  updateCardIndex() {
    var cardIndex = this.state.cardIndex
    var data_length = this.state.data.length
    while (true) {
      cardIndex = Math.floor(Math.random() * data_length)
      if (!this.state.right_ans_2.includes(cardIndex)) {
        break
      }
    }
    return cardIndex
  }
  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }

  render() {
    return (
      <Pane display="flex" justifyContent="space-between">
        <Dialog
          isShown={this.state.isShowAnsTrue}
          title="Thông báo"
          onCloseComplete={() => this.setState({ isShowAnsTrue: false })}
          hasFooter={false}
        >
          {this.state.notify.ans_true}
        </Dialog>
        <Dialog
          isShown={this.state.isShowAnsFalse}
          title="Thông báo"
          onCloseComplete={() => this.setState({ isShowAnsFalse: false })}
          hasFooter={false}
        >
          {this.state.notify.ans_false}
        </Dialog>
        <Dialog
          isShown={this.state.isShowDoneLearn}
          title="Chúc mừng bạn đã hoàn thành học phần"
          onCloseComplete={() => this.setState({ isShowDoneLearn: false })}
          hasFooter={false}
        >
          <Link to={`/set/${this.props.location.pathname.substring(7)}`}>
            <Pane display="flex" borderBottom="default" paddingBottom={10}>
              <Heading size={500} fontWeight={600}>
                Trở về học phần
              </Heading>
            </Pane>
          </Link>
        </Dialog>

        <Pane
          height={530}
          width={200}
          border="default"
          elevation={4}
          paddingLeft={20}
          paddingTop={30}
          textAlign="center"
        >
          <Link to={'/latest'}>
            <Pane display="flex" borderBottom="default" paddingBottom={10}>
              <ChevronLeftIcon size={20} color="#28A7A7" />
              <Heading size={500} fontWeight={600}>
                Trở về học phần
              </Heading>
            </Pane>
          </Link>
          <Pane marginTop={50}>
            <Pane display="flex" marginLeft={10}>
              <AutomaticUpdatesIcon size={30} />
              <Heading size={600} fontWeight={700} marginLeft={30}>
                Học
              </Heading>
            </Pane>
            <Pane marginLeft={10} marginTop={60}>
              <Heading size={600} fontWeight={700}>
                Còn lại
              </Heading>
              <Heading size={600} fontWeight={700}>
                {this.state.data
                  ? this.state.data.length - this.state.right_ans_2.length
                  : "0"}
              </Heading>
            </Pane>
            <Pane marginLeft={10} marginTop={60}>
              <Heading size={600} fontWeight={700}>
                Quen thuộc
              </Heading>
              <Heading size={600} fontWeight={700}>
                {this.state.right_ans_1.length}
              </Heading>
            </Pane>
            <Pane marginLeft={10} marginTop={60}>
              <Heading size={600} fontWeight={700}>
                Nắm vững
              </Heading>
              <Heading size={600} fontWeight={700}>
                {this.state.right_ans_2.length}
              </Heading>
            </Pane>
          </Pane>
        </Pane>
        <Pane
          height={500}
          width={1000}
          border="default"
          elevation={4}
          marginLeft={20}
          marginTop={20}
          marginBottom={20}
        >
          <Pane marginTop={50} marginLeft={100} marginRight={30}>
            <Heading size={600} fontWeight={700}>
              {!this.state.data
                ? 'loading'
                : !this.state.data[this.state.cardIndex]
                ? 'loading'
                : this.state.data[this.state.cardIndex].title}
            </Heading>
          </Pane>
          <Pane display="flex" marginLeft={100} marginTop={200}>
            {this.state.options.map((option, index) => (
              <Button
                key={index}
                width="20%"
                height={80}
                border="default"
                borderRadius={10}
                backgroundColor="#FAE3CD"
                marginTop={20}
                marginRight={100}
                paddingTop={30}
                paddingBottom={30}
                paddingLeft="6%"
                onClick={() => {
                  this.check_ans(option)
                }}
              >
                <Heading size={500} fontWeight={700} textAlign="center">
                  {!this.state.data
                    ? 'loading'
                    : !this.state.data[option]
                    ? 'loading'
                    : this.state.data[option].description}
                </Heading>
              </Button>
            ))}
          </Pane>
        </Pane>
      </Pane>
    )
  }
}
const mapStateToProps = ({ sets }) => {
  return { sets }
}
export default connect(mapStateToProps, { fetchSet })(Learn)
