import React from 'react'
import { Pane, Heading, TextInput,Text,  Dialog } from 'evergreen-ui'
import { ChevronLeftIcon, PredictiveAnalysisIcon, } from 'evergreen-ui'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSet } from '../../actions'
const heightItem = 75

class Game extends React.Component {
  async componentDidMount() {
    await this.props.fetchSet(this.props.match.params.id)
    this.setState({ data: this.props.sets.flash_cards })
    var tem_title_arr=[];
    var tem_description_arr=[];
    for(var i = 0; i < this.state.data.length; i++){
      tem_title_arr.push(i);
      tem_description_arr.push(i);
    }
    tem_title_arr=this.shuffle(tem_title_arr);
    tem_description_arr=this.shuffle(tem_description_arr);
    this.setState({title_arr:tem_title_arr, description_arr:tem_description_arr})
    console.log(this.state.data)
    console.log(this.state.title_arr);
    console.log(this.state.description_arr)
  }
  state = {
    isShown:false,
    pre_answer: {
      index: 0,
      value: '',
    },
    statuses:[],
    answers: [],
    data: [],
    title_arr:[],
    description_arr: [],
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
  check_answers(){
    this.setState({isShown:true});
    var tem_description_arr=this.state.description_arr;
    var tem_title_arr=this.state.title_arr;
    var tem_statuses = this.state.statuses
    for (var i = 0; i < this.state.data.length; i++) {
      tem_statuses.push('false')
    }

    for (var j = 0; j < this.state.data.length; j++) {
      if(
        String.fromCharCode(tem_description_arr.indexOf(tem_title_arr[j])+65)===this.state.answers[j] &&
        this.state.answers[j] !== ''
      ) {
        tem_statuses[j] = 'true'
      } else {
        tem_statuses[j] = 'false'
      }
    }
    console.log(tem_statuses)
    this.setState((prevState) => ({ statuses: tem_statuses }))
  }
  pull_answer(e,index){
    var tem_answers = this.state.answers
    if (tem_answers.length === 0) {
      for (var i = 0; i < this.state.data.length; i++) {
        tem_answers.push('')
      }
      tem_answers[index] = e.target.value
      this.setState({ answers: tem_answers })
    } else {
      tem_answers[index] = e.target.value
      this.setState({ answers: tem_answers })
    }
    console.log(this.state.answers)

  }
  reload_game(){
    this.setState({ isShow: false })
    window.location.reload(false)

  }
  calculator_mark(){
    var count_true_answ = 0
    var data_length = this.state.data.length === 0 ? 1 : this.state.data.length
    for (var i = 0; i < data_length; i++) {
      if (this.state.statuses[i] === 'true') count_true_answ++
    }
    return Math.floor((count_true_answ * 100) / data_length)
  }
  render() {
    return (
      <Pane display="flex" justifyContent="space-between">
        <Dialog
          isShown={this.state.isShown}
          title="Kết quả"
          onCloseComplete={() => (this.reload_game())}
          hasFooter={false}
        >
          <Pane>
              <Pane
                height={100}
                width={150}
                backgroundColor="#D2EEF3"
                border="default"
                borderRadius={10}
                elevation={4}
                marginLeft={200}
                marginTop={20}
                marginBottom={20}
                textAlign="center"
                paddingTop={25}
              >
                <Heading size={900} fontWeight={800}>
                  {this.calculator_mark()}
                </Heading>
              </Pane>
              <Pane
                height={50}
                width={150}
                backgroundColor="#D2EEF3"
                border="default"
                borderRadius={10}
                elevation={4}
                marginLeft={200}
                marginTop={20}
                marginBottom={20}
                textAlign="center"
                paddingTop={10}
              >
                <Pane 
                  width="60%"
                  height={heightItem}
                  onClick={() => {
                    window.location.reload(false)
                  }}
                >
                  <Heading size={500} fontWeight={700} marginLeft={40} width="80%">
                    Chơi lại
                  </Heading>
                </Pane>
              </Pane>
            </Pane>
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
          <Link to={`/set/${this.props.match.params.id}`}>
            <Pane display="flex" borderBottom="default" paddingBottom={10}>
              <ChevronLeftIcon size={20} color="#28A7A7" />
              <Heading size={500} fontWeight={600}>
                Trở về học phần
              </Heading>
            </Pane>
          </Link>
          <Pane marginTop={150}>
            <Pane display="flex" marginLeft={10}>
              <PredictiveAnalysisIcon size={30} />
              <Heading size={600} fontWeight={700} marginLeft={10}>
                Ghép thẻ
              </Heading>
            </Pane>
          </Pane>
        </Pane>
        <Pane 
          width={1000}
          border="default"
          elevation={4}
          marginLeft={20}
          marginTop={20}
          marginBottom={20}
        >
          <Heading size={600} fontWeight="bold" textAlign="center" marginTop={50}>Hướng dẫn: Ghép các từ với nghĩa phù hợp rồi điền vào ô trống</Heading>
          <Pane>
            {!this.state.data?'loading':this.state.title_arr.map((item, index)=>(
              <Pane display="flex" justifyContent="space-between">
              <Pane
                width="25%"
                height={heightItem}
                border="default"
                borderRadius={10}
                elevation={4}
                marginLeft={100}
                marginTop={20}
                marginBottom={20}
                paddingLeft={10}
                paddingTop={10}
                background="#DDEBF7"
              >
                <Heading size={400}>{`${index+1}. ${this.state.data[item].title}`}</Heading>
              </Pane>
              <Pane
                width="25%"
                height={heightItem}
                border="default"
                borderRadius={10}
                elevation={4}
                marginRight={100}
                marginTop={20}
                marginBottom={20}
                paddingLeft={10}
                paddingTop={10}
                background="#DDEBF7"
              >
                <Heading size={400}>{`${String.fromCharCode(index+65)}. ${this.state.data[this.state.description_arr[index]].description}`}</Heading>
              </Pane>
            </Pane>
            
            ))}
          </Pane>
          <Pane
            width="80%"
            display="flex"
          >
            {!this.state.data?'loading':this.state.title_arr.map((title, index) =>(
              <Pane
              marginBottom={20}
              marginTop={20}
              display="flex"
              paddingLeft={20}
  
            >
            <Heading size={500} fontWeight={600}>{`Câu số ${index+1}:`}</Heading>
            <TextInput 
              borderRadius={5}
              width={50}
              marginLeft={10}
              onChange={(e) => {  this.pull_answer(e, index)}}
            ></TextInput>
            </Pane>
            ))}
          </Pane>
          <Pane
            backgroundColor="#47B881"
            borderRadius={10}
            height={heightItem}
            elevation={1}
            width="80%"
            onClick={() => {
              this.check_answers()
            }}
            textAlign="center"
            cursor="pointer"
            margin="auto"
          >
            <Text
              fontSize={16}
              lineHeight="75px"
              fontWeight={500}
              color="white"
            >
              NỘP BÀI
            </Text>
          </Pane>
        </Pane>
      </Pane>
    )
  }
}

const mapStateToProps = ({ sets }) => {
  return { sets: { ...sets }.data }
}

export default connect(mapStateToProps, { fetchSet })(Game)
